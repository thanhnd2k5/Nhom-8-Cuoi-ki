import React, { useEffect, useState } from 'react';
import { Tabs, Button, Form, message } from 'antd';
import PersonalInfoForm from './components/PersonalInfoForm';
import AcademicInfoForm from './components/AcademicInfoForm';
import { fetchProfileData, saveProfileData } from '@/models/User/profile';
import moment from 'moment';

const ProfilePage: React.FC = () => {
  const [personalForm] = Form.useForm();
  const [academicForm] = Form.useForm();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetchProfileData().then((data) => {
      setInitialData(data);
      academicForm.setFieldsValue(data);
    });
  }, []);

  const handleSave = async () => {
    try {
      const personalValues = await personalForm.validateFields();
      const academicValues = await academicForm.validateFields();
      const data = { ...personalValues, ...academicValues };
      await saveProfileData(data);
      message.success('Lưu thông tin thành công!');
    } catch (err) {
      message.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Hồ sơ cá nhân</h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Thông tin cá nhân" key="1">
          <PersonalInfoForm form={personalForm} initialData={initialData?.data} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Thông tin học tập" key="2">
          <AcademicInfoForm form={academicForm} />
        </Tabs.TabPane>
      </Tabs>
      <div style={{ textAlign: 'right', marginTop: 24 }}>
        <Button type="primary" onClick={handleSave}>
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
