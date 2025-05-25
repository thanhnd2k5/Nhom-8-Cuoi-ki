import React, { useState, useEffect } from 'react';
import StepMethod from './StepMethod';
import StepSchoolMajor from './StepSchoolMajor';
import StepPersonalInfo from './StepPersonalInfo';
import StepScore from './StepScore';
import StepUpload from './StepUpload';
import StepConfirm from './StepConfirm';
import { fetchProfileData } from '@/models/User/profile';

const AdmissionForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfileData().then(res => setProfile(res.data || res));
  }, []);

  const next = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };
  const prev = () => setStep(step - 1);

  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh', padding: '32px 0' }}>
      {step === 1 && <StepMethod onNext={next} />}
      {step === 2 && <StepSchoolMajor onNext={next} onPrev={prev} />}
      {step === 3 && (
        <StepPersonalInfo
          data={formData}
          profile={profile}
          onNext={next}
          onPrev={prev}
        />
      )}
      {step === 4 && <StepScore method={formData.method} onNext={next} onPrev={prev} />}
      {step === 5 && <StepUpload onNext={next} onPrev={prev} />}
      {step === 6 && <StepConfirm data={formData} onPrev={prev} />}
    </div>
  );
};

export default AdmissionForm;
