import React from 'react';
import { Form, Upload, Card, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useModel, history } from 'umi';
import NewApplicationLayout from '../NewApplicationLayout';
import useApplicationsModel from '@/models/User/applications';
import { requiredDocumentsByMethod } from '@/utils/utils';

const Step5: React.FC = () => {
  const { formData, updateFormData } = useModel('User.applications');
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState<Record<string, UploadFile[]>>({});

  // Lấy danh sách giấy tờ cần upload theo phương thức
  const documents = requiredDocumentsByMethod[formData.admissionMethod] || [];

  // Xử lý upload từng loại giấy tờ
  const handleChange = (type: string, { fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(prev => ({ ...prev, [type]: newFileList }));
  };

  const handleSubmit = async () => {
    try {
      // Validate: kiểm tra các loại required đã có file
      for (const doc of documents) {
        if (doc.required && (!fileList[doc.type] || fileList[doc.type].length === 0)) {
          return message.error(`Vui lòng tải lên ${doc.label}`);
        }
      }
      // Chuẩn hóa dữ liệu để lưu vào formData
      const documentsData = documents.map(doc => ({
        type: doc.type,
        // Lưu file object thực tế (file gốc user upload)
        file: fileList[doc.type]?.[0]?.originFileObj || null,
        fileType: fileList[doc.type]?.[0]?.type || '',
      }));
      updateFormData({ documentsData });
      history.push('/user/applications/new/step6');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (  
    <NewApplicationLayout currentStep={4}>
      <Card title="Tải lên minh chứng" className="mb-4">
        <Form form={form} layout="vertical">
          {documents.map(doc => (
            <Form.Item
              key={doc.type}
              label={doc.label}
              required={doc.required}
            >
              <Upload
                listType="picture"
                maxCount={1}
                fileList={fileList[doc.type] || []}
                onChange={info => handleChange(doc.type, info)}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Tải lên</Button>
              </Upload>
            </Form.Item>
          ))}
        </Form>
      </Card>

      <div className="flex justify-end gap-4">
        <Button onClick={handleBack}>Quay lại</Button>
        <Button type="primary" onClick={handleSubmit}>
          Tiếp tục
        </Button>
      </div>
    </NewApplicationLayout>
  );
};

export default Step5; 