import React, { useState } from 'react';
import { Card, Button, Radio } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
import NewApplicationLayout from '../NewApplicationLayout';
import './NewApplication.less';

const { Group: RadioGroup } = Radio;

const Step1Page: React.FC = () => {
  const { updateFormData } = useModel('User.applications');
  const [selectedAdmissionMethod, setSelectedAdmissionMethod] = useState<string>('');

  // Các phương thức xét tuyển
  const admissionMethods = [
    {
      id: 'hoc_ba',
      name: 'Xét tuyển học bạ',
      description: 'Xét tuyển dựa trên kết quả học tập THPT (điểm trung bình các môn học)',
      icon: '📚'
    },
    {
      id: 'tot_nghiep',
      name: 'Điểm thi THPT Quốc gia',
      description: 'Xét tuyển dựa trên kết quả kỳ thi THPT Quốc gia',
      icon: '📝'
    },
    {
      id: 'dgnl',
      name: 'Đánh giá năng lực',
      description: 'Xét tuyển dựa trên kết quả bài thi đánh giá năng lực của các trường đại học',
      icon: '🎯'
    },
    {
      id: 'tu_duy',
      name: 'Đánh giá tư duy',
      description: 'Xét tuyển dựa trên kết quả bài thi đánh giá tư duy logic và sáng tạo',
      icon: '🧠'
    }
  ];

  const handleMethodChange = (e: any) => {
    setSelectedAdmissionMethod(e.target.value);
  };

  const handleNext = () => {
    if (selectedAdmissionMethod) {
      updateFormData({ admissionMethod: selectedAdmissionMethod });
      history.push(`/user/applications/new/step2?method=${selectedAdmissionMethod}`);
    }
  };

  return (
    <NewApplicationLayout currentStep={0}>
      <Card className="main-card">
        <div className="card-header">
          <h2>Bước 1: Chọn phương thức xét tuyển</h2>
          <p>Chọn phương thức xét tuyển phù hợp với bạn</p>
        </div>

        <div className="card-content">
          <RadioGroup 
            value={selectedAdmissionMethod} 
            onChange={handleMethodChange}
            className="admission-methods"
          >
            {admissionMethods.map((method) => (
              <div 
                key={method.id}
                className={`method-card ${selectedAdmissionMethod === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedAdmissionMethod(method.id)}
              >
                <Radio value={method.id} className="method-radio">
                  <div className="method-content">
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-info">
                      <h3 className="method-name">{method.name}</h3>
                      <p className="method-description">{method.description}</p>
                    </div>
                  </div>
                </Radio>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="card-footer">
          <Button 
            type="primary" 
            icon={<ArrowRightOutlined />}
            onClick={handleNext}
            disabled={!selectedAdmissionMethod}
          >
            Tiếp tục
          </Button>
        </div>
      </Card>
    </NewApplicationLayout>
  );
};

export default Step1Page;