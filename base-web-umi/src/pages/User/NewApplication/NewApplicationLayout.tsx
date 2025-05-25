import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';
import './NewApplicationLayout.less';

const steps = [
  { title: 'Chọn phương thức' },
  { title: 'Trường & ngành' },
  { title: 'Thông tin cá nhân' },
  { title: 'Điểm thi' },
  { title: 'Ảnh minh chứng' },
  { title: 'Hoàn thành' },
];

interface Props {
  currentStep: number; // 0-based
  children: React.ReactNode;
  onBack?: () => void;
}

const NewApplicationLayout: React.FC<Props> = ({ currentStep, children, onBack }) => {
  const history = useHistory();

  return (
    <div className="new-application-layout">
      <div className="page-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack || history.goBack}
          className="back-button"
        >
          Quay lại
        </Button>
      </div>
      <div className="step-indicator">
        <div className="step-progress">
          {steps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div className={`step ${idx < currentStep ? 'completed' : ''} ${idx === currentStep ? 'active' : ''}`}>
                <div className="step-number">{idx + 1}</div>
                <div className="step-title">{step.title}</div>
              </div>
              {idx < steps.length - 1 && <div className={`step-line ${idx < currentStep ? 'completed' : ''}`}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default NewApplicationLayout;
