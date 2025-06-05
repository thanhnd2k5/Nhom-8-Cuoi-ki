import jsPDF from 'jspdf';
import { 
  addHeader, 
  addSection, 
  addFooter, 
  addSignatureSection,
  PDF_CONFIG 
} from '@/utils/pdfUtils';

// Maps cho hiển thị
const statusMap = {
  cho_duyet: { color: 'processing', text: 'Chờ duyệt' },
  da_duyet: { color: 'success', text: 'Đã duyệt' },
  tu_choi: { color: 'error', text: 'Từ chối' },
};

const areaMap = {
  'KV1': 'Khu vực 1',
  'KV2': 'Khu vực 2', 
  'KV3': 'Khu vực 3'
};

const groupMap = {
  'Không': 'Không có',
  'DT1': 'Dân tộc thiểu số',
  'DT2': 'Con liệt sĩ'
};

// Hàm tạo thông tin cá nhân
const generatePersonalInfoSection = (application) => {
  const content = [
    { type: 'info', label: 'Họ và tên', value: application.name },
    { type: 'info', label: 'Email', value: application.email },
    { type: 'info', label: 'Số điện thoại', value: application.phone },
    { type: 'info', label: 'Tên trường', value: application.university },
    { type: 'info', label: 'Tên ngành học', value: application.major },
    { type: 'info', label: 'Phương thức xét tuyển', value: application.method },
  ];

  // Thêm tổ hợp nếu có
  if (application.combination) {
    content.push({ type: 'info', label: 'Tổ hợp xét tuyển', value: application.combination });
  }

  content.push(
    { type: 'info', label: 'Trạng thái', value: statusMap[application.status]?.text || 'Không xác định' },
    { type: 'info', label: 'Ngày nộp', value: application.dates.submitted },
    { type: 'info', label: 'Ngày cập nhật', value: application.dates.updated }
  );

  return content;
};

// Hàm tạo thông tin điểm số
const generateScoresSection = (application) => {
  const content = [];
  const { scores, subjectScores, totalScore, method, priority } = application;

  // Hiển thị điểm theo phương thức
  if (method === 'Xét tuyển học bạ') {
    content.push(
      { type: 'score', label: 'Điểm TB lớp 10', value: scores['GPA 10']?.toFixed(2) || '0.00' },
      { type: 'score', label: 'Điểm TB lớp 11', value: scores['GPA 11']?.toFixed(2) || '0.00' },
      { type: 'score', label: 'Điểm TB lớp 12', value: scores['GPA 12']?.toFixed(2) || '0.00' }
    );
  } else if (method === 'Điểm thi THPT Quốc gia') {
    Object.entries(subjectScores || {}).forEach(([subject, score]) => {
      content.push({ type: 'score', label: `Điểm ${subject}`, value: score?.toFixed(2) || '0.00' });
    });
  } else if (method === 'Đánh giá năng lực') {
    content.push({ type: 'score', label: 'Điểm đánh giá năng lực', value: totalScore?.toFixed(2) || '0.00' });
  } else if (method === 'Đánh giá tư duy') {
    content.push({ type: 'score', label: 'Điểm tư duy', value: totalScore?.toFixed(2) || '0.00' });
  }

  // Thông tin ưu tiên
  content.push(
    { type: 'info', label: 'Khu vực ưu tiên', value: areaMap[priority?.area] || 'Không có' },
    { type: 'info', label: 'Đối tượng ưu tiên', value: groupMap[priority?.group] || 'Không có' },
    { type: 'score', label: 'Điểm ưu tiên', value: priority?.score?.toFixed(2) || '0.00' }
  );

  // Tổng điểm cuối cùng
  const finalScore = (totalScore || 0) + (priority?.score || 0);
  content.push({
    type: 'highlight',
    label: 'TỔNG ĐIỂM SAU CỘNG ƯU TIÊN',
    value: finalScore.toFixed(2) + ' ĐIỂM'
  });

  return content;
};

// Hàm tạo danh sách tài liệu
const generateDocumentsSection = (documents) => {
  const content = [];
  
  if (documents && documents.length > 0) {
    documents.forEach((doc, index) => {
      const status = doc.status === 'approved' ? '✓' : '✗';
      content.push({
        type: 'info',
        label: `${index + 1}. ${status}`,
        value: doc.name
      });
    });
  } else {
    content.push({
      type: 'info',
      label: 'Trạng thái',
      value: 'Chưa có tài liệu nào được tải lên'
    });
  }

  return content;
};

// Hàm chính tạo PDF
export const generateApplicationPDF = (application) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  
  try {
    let currentY = 0;

    // Header
    currentY = addHeader(
      doc,
      application.university,
      'HỒ SƠ XÉT TUYỂN ĐẠI HỌC',
      application.id || 'N/A'
    );

    // Thông tin cá nhân
    const personalInfo = generatePersonalInfoSection(application);
    currentY = addSection(doc, '1. THÔNG TIN CÁ NHÂN', currentY, personalInfo);

    // Kiểm tra nếu cần trang mới
    if (currentY > 200) {
      doc.addPage();
      currentY = 20;
    }

    // Thông tin điểm số
    const scoresInfo = generateScoresSection(application);
    currentY = addSection(doc, '2. THÔNG TIN ĐIỂM SỐ VÀ XÉT TUYỂN', currentY, scoresInfo);

    // Kiểm tra nếu cần trang mới
    if (currentY > 220) {
      doc.addPage();
      currentY = 20;
    }

    // Danh sách tài liệu
    const documentsInfo = generateDocumentsSection(application.documents);
    currentY = addSection(doc, '3. DANH SÁCH TÀI LIỆU', currentY, documentsInfo);

    // Chữ ký
    currentY = addSignatureSection(doc, currentY);

    // Footer
    addFooter(doc, 1, 1);

    return doc;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Không thể tạo file PDF. Vui lòng thử lại.');
  }
};

// Hàm tải xuống PDF
export const downloadApplicationPDF = (application) => {
  try {
    const doc = generateApplicationPDF(application);
    const fileName = `HoSo_${application.name?.replace(/\s+/g, '_') || 'Unknown'}_${application.id || new Date().getTime()}.pdf`;
    doc.save(fileName);
    return true;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};

// Hàm preview PDF (mở trong tab mới)
export const previewApplicationPDF = (application) => {
  try {
    const doc = generateApplicationPDF(application);
    const pdfDataUri = doc.output('datauristring');
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Xem trước hồ sơ - ${application.name}</title>
        </head>
        <body style="margin:0;">
          <iframe src="${pdfDataUri}" width="100%" height="100%" style="border:none;"></iframe>
        </body>
      </html>
    `);
    return true;
  } catch (error) {
    console.error('Error previewing PDF:', error);
    throw error;
  }
};