// Không cần import useEffect, useState, getUserInfo, getCompleteApplicationById nữa
import React from 'react';
import { Button, Badge, message } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { jsPDF } from 'jspdf';
import { timesNewRomanBase64 } from '@/assets/fonts/times-new-roman';

interface ApplicationData {
  application: {
    _id: string;
    universityMajorId: {
      university: string;
      code: string;
      name: string;
    };
    admissionMethod: string;
    status: string;
  };
  profile: {
    name: string;
    cccd: string;
    email: string;
    phone: string;
    address: string;
    ethnic: string;
    priorityArea: string;
    priorityGroup: string;
  };
  applicationResult: {
    method: string;
    gpaGrade10?: number;
    gpaGrade11?: number;
    gpaGrade12?: number;
    subjectScores?: Record<string, number>;
    totalScore?: number;
  };
  documents: Array<{
    type: string;
    fileUrl: string;
  }>;
}

interface Props {
  status: string;
  statusMap: Record<string, { color: string; text: string }>;
  onBack: () => void;
  applicationData: ApplicationData;
}

const ApplicationHeader: React.FC<Props> = ({ status, statusMap, onBack, applicationData }) => {
  const handleDownloadPDF = () => {
    if (!applicationData?.application) {
      message.error('Không có dữ liệu hồ sơ');
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Thêm font Times New Roman
      doc.addFileToVFS('times-new-roman.ttf', timesNewRomanBase64);
      doc.addFont('times-new-roman.ttf', 'Times New Roman', 'normal');
      doc.setFont('Times New Roman');

      const lineHeight = 8;
      let y = 20;

      // Header
      doc.setFontSize(16);
      doc.setFont('Arial Unicode MS', 'normal');
      doc.text('HỒ SƠ XÉT TUYỂN ĐẠI HỌC', doc.internal.pageSize.width / 2, y, {
        align: 'center',
        charSpace: 0
      });

      // Reset font size for content
      doc.setFontSize(12);
      y += lineHeight * 2;

      // Thông tin cá nhân
      doc.text('THÔNG TIN CÁ NHÂN:', 20, y, { charSpace: 0 });
      y += lineHeight;

      if (applicationData.profile) {
        const personalInfo = [
          `Họ và tên: ${applicationData.profile.name || '--'}`,
          `CCCD/CMND: ${applicationData.profile.cccd || '--'}`,
          `Email: ${applicationData.profile.email || '--'}`,
          `Điện thoại: ${applicationData.profile.phone || '--'}`,
          `Địa chỉ: ${applicationData.profile.address || '--'}`,
          `Dân tộc: ${applicationData.profile.ethnic || '--'}`,
          `Khu vực ưu tiên: ${applicationData.profile.priorityArea || 'Không'}`,
          `Đối tượng ưu tiên: ${applicationData.profile.priorityGroup || 'Không'}`,
        ];

        personalInfo.forEach(line => {
          doc.text(line, 30, y, { charSpace: 0 });
          y += lineHeight;
        });
      }

      y += lineHeight;
      doc.text('THÔNG TIN TRƯỜNG VÀ NGÀNH', 20, y);
      y += lineHeight;

      const uni = applicationData.application.universityMajorId;
      if (uni) {
        const uniInfo = [
          `Trường: ${uni.university}`,
          `Mã ngành: ${uni.code}`,
          `Tên ngành: ${uni.name}`,
          `Phương thức: ${applicationData.application.admissionMethod}`,
          `Trạng thái: ${statusMap[status]?.text}`,
        ];
        uniInfo.forEach(line => {
          doc.text(line, 30, y);
          y += lineHeight;
        });
      }

      y += lineHeight;
      doc.text('THÔNG TIN ĐIỂM', 20, y);
      y += lineHeight;

      if (applicationData.applicationResult.method === 'hoc_ba') {
        doc.text(`Điểm TB lớp 10: ${applicationData.applicationResult.gpaGrade10}`, 30, y); y += lineHeight;
        doc.text(`Điểm TB lớp 11: ${applicationData.applicationResult.gpaGrade11}`, 30, y); y += lineHeight;
        doc.text(`Điểm TB lớp 12: ${applicationData.applicationResult.gpaGrade12}`, 30, y); y += lineHeight;
      } else if (applicationData.applicationResult.subjectScores) {
        Object.entries(applicationData.applicationResult.subjectScores).forEach(([subject, score]) => {
          doc.text(`${subject}: ${score}`, 30, y);
          y += lineHeight;
        });
      }

      if (applicationData.applicationResult.totalScore) {
        doc.text(`Tổng điểm: ${applicationData.applicationResult.totalScore}`, 30, y);
        y += lineHeight;
      }

      y += lineHeight;
      doc.text('GIẤY TỜ ĐÃ NỘP', 20, y);
      y += lineHeight;

      applicationData.documents?.forEach(docItem => {
        doc.text(`- ${docItem.type}`, 30, y);
        y += lineHeight;
      });

      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 20, pageHeight - 20);
      doc.save(`ho-so-xet-tuyen-${applicationData.application._id}.pdf`);

      message.success('Tải xuống hồ sơ thành công');
    } catch (error) {
      console.error('Error generating PDF:', error);
      message.error('Có lỗi xảy ra khi tạo file PDF');
    }
  };

  return (
    <div className="header">
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={onBack}>
        Quay lại danh sách hồ sơ
      </Button>
      <div className="header-actions">
        <Badge status={statusMap[status]?.color as any} text={statusMap[status]?.text} />
        <Button icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
          Tải xuống hồ sơ
        </Button>
      </div>
    </div>
  );
};

export default ApplicationHeader;
