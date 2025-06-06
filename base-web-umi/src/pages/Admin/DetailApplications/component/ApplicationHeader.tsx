import { message } from 'antd';
import { jsPDF } from 'jspdf';

const handleDownload = async () => {
  try {
    const res = await fetch('/users/applications/complete/6833f49ca1c9e23aeec902b5');
    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || 'Không thể lấy dữ liệu');
    }

    const { application, applicationResult, documents, profile } = result.data;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('HỒ SƠ XÉT TUYỂN', 14, 20);
    doc.setFontSize(12);

    let y = 30;

    const addLine = (label: string, value: string | number | undefined) => {
      if (value !== undefined) {
        doc.text(`${label}: ${value}`, 14, y);
        y += 8;
      }
    };

    // Thông tin cá nhân
    addLine('Họ tên', profile.name);
    addLine('Email', profile.email);
    addLine('SĐT', profile.phone);
    addLine('Khu vực ưu tiên', profile.priorityArea ?? 'Không');
    addLine('Đối tượng ưu tiên', profile.priorityGroup ?? 'Không');

    y += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Thông tin hồ sơ', 14, y);
    doc.setFont(undefined, 'normal');
    y += 8;

    addLine('Trường', application.universityMajorId?.university);
    addLine('Ngành', application.universityMajorId?.name);
    addLine('Phương thức xét tuyển', application.admissionMethod);
    addLine('Tổ hợp môn', application.subjectCombinationId?.code);
    addLine('Trạng thái', application.status);
    addLine('Ngày nộp', new Date(application.created_at).toLocaleString());
    addLine('Cập nhật', new Date(application.updated_at).toLocaleString());

    y += 6;
    doc.setFont(undefined, 'bold');
    doc.text('Kết quả xét tuyển', 14, y);
    doc.setFont(undefined, 'normal');
    y += 8;

    addLine('GPA lớp 10', applicationResult.gpaGrade10);
    addLine('GPA lớp 11', applicationResult.gpaGrade11);
    addLine('GPA lớp 12', applicationResult.gpaGrade12);
    addLine('Tổng điểm', applicationResult.totalScore);
    addLine('Phương thức đánh giá', applicationResult.method);

    // In điểm từng môn (nếu có)
    if (applicationResult.subjectScores && typeof applicationResult.subjectScores === 'object') {
      Object.entries(applicationResult.subjectScores).forEach(([subject, score]) => {
        if (typeof score === 'number') {
          addLine(`Môn ${subject}`, score);
        }
      });
    }

    // Tài liệu đính kèm
    if (Array.isArray(documents) && documents.length > 0) {
      y += 6;
      doc.setFont(undefined, 'bold');
      doc.text('Danh sách tài liệu đính kèm', 14, y);
      doc.setFont(undefined, 'normal');
      y += 8;

      documents.forEach((docItem: { type: string; fileUrl: string; fileType: string }, index: number) => {
        addLine(`${index + 1}. ${docItem.type}`, `${docItem.fileUrl} (${docItem.fileType})`);
      });
    }

    // Xuất PDF
    doc.save(`HoSo_${profile.name || 'UngVien'}.pdf`);
  } catch (error: any) {
    message.error(error?.message || 'Tải xuống thất bại');
  }
};
