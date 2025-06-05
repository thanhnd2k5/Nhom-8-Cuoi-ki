import jsPDF from 'jspdf';
import '@/utils/Roboto'

// Cấu hình font và style
const PDF_CONFIG = {
  margins: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20
  },
  pageWidth: 210, // A4 width in mm
  pageHeight: 297, // A4 height in mm
  fontSize: {
    title: 16,
    subtitle: 14,
    normal: 12,
    small: 10
  },
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    text: '#333333',
    lightText: '#666666'
  }
};

// Utility function để thêm text với word wrap
export const addTextWithWrap = (doc, text, x, y, maxWidth, lineHeight = 6) => {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line, index) => {
    doc.text(line, x, y + (index * lineHeight));
  });
  return y + (lines.length * lineHeight);
};

// Utility function để vẽ box
export const drawBox = (doc, x, y, width, height, fillColor = null, strokeColor = '#000000') => {
  if (fillColor) {
    doc.setFillColor(fillColor);
    doc.rect(x, y, width, height, 'FD');
  } else {
    doc.setDrawColor(strokeColor);
    doc.rect(x, y, width, height, 'S');
  }
};

// Utility function để thêm header
export const addHeader = (doc, university, title, applicationId) => {
  const { margins, pageWidth, fontSize } = PDF_CONFIG;
  
  // University name
  doc.setFontSize(fontSize.subtitle);
  doc.setFont('Robotor', 'bold');
  const universityWidth = doc.getTextWidth(university);
  doc.text(university, (pageWidth - universityWidth) / 2, margins.top + 10);
  
  // Title
  doc.setFontSize(fontSize.title);
  doc.setFont('Robotor', 'bold');
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, margins.top + 25);
  
  // Application ID
  doc.setFontSize(fontSize.small);
  doc.setFont('Robotor', 'normal');
  const idText = `Mã hồ sơ: ${applicationId}`;
  const idWidth = doc.getTextWidth(idText);
  doc.text(idText, (pageWidth - idWidth) / 2, margins.top + 35);
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.line(margins.left, margins.top + 45, pageWidth - margins.right, margins.top + 45);
  
  return margins.top + 55; // Return next Y position
};

// Utility function để thêm section
export const addSection = (doc, title, startY, content) => {
  const { margins, pageWidth, fontSize } = PDF_CONFIG;
  let currentY = startY;
  
  // Section title
  doc.setFontSize(fontSize.subtitle);
  doc.setFont('Robotor', 'bold');
  doc.text(title, margins.left, currentY);
  currentY += 10;
  
  // Section border
  const sectionHeight = content.length * 8 + 10;
  drawBox(doc, margins.left, currentY - 5, pageWidth - margins.left - margins.right, sectionHeight, '#f8f9fa');
  
  // Content
  doc.setFontSize(fontSize.normal);
  doc.setFont('Robotor', 'normal');
  
  content.forEach(item => {
    if (item.type === 'info') {
      doc.setFont('Robotor', 'bold');
      doc.text(item.label + ':', margins.left + 5, currentY + 5);
      doc.setFont('Robotor', 'normal');
      doc.text(item.value, margins.left + 60, currentY + 5);
      currentY += 8;
    } else if (item.type === 'score') {
      doc.setFont('Robotor', 'bold');
      doc.text(item.label + ':', margins.left + 5, currentY + 5);
      doc.setFont('Robotor', 'normal');
      doc.text(item.value + ' điểm', margins.left + 60, currentY + 5);
      currentY += 8;
    } else if (item.type === 'highlight') {
      doc.setFont('Robotor', 'bold');
      doc.setFontSize(fontSize.subtitle);
      const highlightText = `${item.label}: ${item.value}`;
      const textWidth = doc.getTextWidth(highlightText);
      doc.text(highlightText, (pageWidth - textWidth) / 2, currentY + 5);
      doc.setFontSize(fontSize.normal);
      currentY += 12;
    }
  });
  
  return currentY + 15;
};

// Utility function để thêm footer
export const addFooter = (doc, pageNumber = 1, totalPages = 1) => {
  const { margins, pageWidth, pageHeight, fontSize } = PDF_CONFIG;
  
  // Page number
  doc.setFontSize(fontSize.small);
  doc.setFont('Robotor', 'normal');
  const pageText = `Trang ${pageNumber}/${totalPages}`;
  const pageTextWidth = doc.getTextWidth(pageText);
  doc.text(pageText, (pageWidth - pageTextWidth) / 2, pageHeight - margins.bottom + 5);
  
  // Generation date
  const dateText = `Tạo ngày: ${new Date().toLocaleDateString('vi-VN')}`;
  doc.text(dateText, margins.left, pageHeight - margins.bottom + 5);
  
  // Line separator
  doc.setLineWidth(0.3);
  doc.line(margins.left, pageHeight - margins.bottom - 5, pageWidth - margins.right, pageHeight - margins.bottom - 5);
};

// Utility function để thêm signature section
export const addSignatureSection = (doc, startY) => {
  const { margins, pageWidth, fontSize } = PDF_CONFIG;
  let currentY = startY;
  
  // Add some space
  currentY += 20;
  
  // Signature boxes
  const boxWidth = 80;
  const leftBoxX = margins.left + 10;
  const rightBoxX = pageWidth - margins.right - boxWidth - 10;
  
  // Left signature box
  doc.setFontSize(fontSize.normal);
  doc.setFont('Robotor', 'bold');
  doc.text('NGƯỜI NỘP HỒ SƠ', leftBoxX + 10, currentY);
  doc.setFont('Robotor', 'normal');
  doc.text('(Ký và ghi rõ họ tên)', leftBoxX + 5, currentY + 8);
  drawBox(doc, leftBoxX, currentY + 15, boxWidth, 40);
  
  // Right signature box
  doc.setFont('Robotor', 'bold');
  doc.text('CÁN BỘ TIẾP NHẬN', rightBoxX + 10, currentY);
  doc.setFont('Robotor', 'normal');
  doc.text('(Ký và đóng dấu)', rightBoxX + 10, currentY + 8);
  drawBox(doc, rightBoxX, currentY + 15, boxWidth, 40);
  
  return currentY + 60;
};

export default PDF_CONFIG;