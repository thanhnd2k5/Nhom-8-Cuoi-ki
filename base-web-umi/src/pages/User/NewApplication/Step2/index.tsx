import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Form, Alert } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { history, useLocation } from 'umi';
import useUniversityModel from '@/models/User/university';
import useUniversityMajorsModel from '@/models/User/university_majors';
import useSubjectCombinationsModel from '@/models/User/subject_combinations';
import './Step2.less';
import { University } from '@/models/User/university';

const { Option } = Select;

const Step2Page: React.FC = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  
  const admissionMethod = location.query.method || '';
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedCombination, setSelectedCombination] = useState<string>('');

  // Models
  const { universities, loading: universitiesLoading, fetchUniversities } = useUniversityModel();
  const { universityMajors, loading: majorsLoading, fetchUniversityMajors } = useUniversityMajorsModel();
  const { subjectCombinations, loading: combinationsLoading, fetchSubjectCombinations } = useSubjectCombinationsModel();
  console.log(universityMajors)
  // Admission method names
  const admissionMethodNames = {
    'transcript': 'Xét tuyển học bạ',
    'national-exam': 'Điểm thi THPT Quốc gia',
    'competency-assessment': 'Đánh giá năng lực',
    'thinking-assessment': 'Đánh giá tư duy'
  };

  // Check if current method needs subject combination
  const needsSubjectCombination = ['hoc_ba', 'tot_nghiep'].includes(admissionMethod);

  useEffect(() => {
    // Fetch universities on component mount
    fetchUniversities();
    
    // Fetch subject combinations if needed
    if (needsSubjectCombination && selectedMajor) {
      fetchSubjectCombinations();
    }
  }, []);

  useEffect(() => {
    // Fetch majors when university is selected
    if (selectedUniversity) {
      fetchUniversityMajors(selectedUniversity);
      setSelectedMajor('');
      setSelectedCombination('');
    }
  }, [selectedUniversity]);

  useEffect(() => {
    // Clear combination when major changes
    if (selectedMajor) {
      setSelectedCombination('');
    }
  }, [selectedMajor]);

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
    form.setFieldsValue({ major: undefined, combination: undefined });
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    form.setFieldsValue({ combination: undefined });
  };

  const handleCombinationChange = (value: string) => {
    setSelectedCombination(value);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleNext = () => {
    const formData = {
      admissionMethod,
      university: selectedUniversity,
      major: selectedMajor,
      ...(needsSubjectCombination && { combination: selectedCombination })
    };
    
    // Navigate to step 3 with form data
    const queryParams = new URLSearchParams(formData).toString();
    history.push(`/user/applications/new/step3?${queryParams}`);
  };

  const isFormValid = () => {
    if (!selectedUniversity || !selectedMajor) return false;
    if (needsSubjectCombination && !selectedCombination) return false;
    return true;
  };

  // Filter subject combinations based on selected major
  const getAvailableCombinations = () => {
    if (!selectedMajor) return [];
    
    const selectedMajorData = universityMajors.find(major => major._id === selectedMajor);
    if (!selectedMajorData) return [];

    return subjectCombinations.filter(combination => 
      selectedMajorData.subject_combination_ids.includes(combination._id)
    );
  };

  return (
    <div className="step2-page">
      <div className="page-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="back-button"
        >
          Quay lại bước trước
        </Button>
      </div>

      <div className="page-content">
        <div className="step-indicator">
          <div className="step-progress">
            <div className="step completed">
              <div className="step-number">1</div>
              <div className="step-title">Chọn phương thức</div>
            </div>
            <div className="step-line completed"></div>
            <div className="step active">
              <div className="step-number">2</div>
              <div className="step-title">Trường & ngành</div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-title">Thông tin cá nhân</div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-title">Hoàn thành</div>
            </div>
          </div>
        </div>

        <Card className="main-card">
          <div className="card-header">
            <h2>Bước 2: Chọn trường và ngành</h2>
            <p>Chọn trường đại học, ngành học và tổ hợp xét tuyển</p>
          </div>

          <div className="card-content">
            <Alert
              message="Phương thức xét tuyển đã chọn"
              description={admissionMethodNames[admissionMethod as keyof typeof admissionMethodNames]}
              type="info"
              showIcon
              className="method-alert"
            />

            <Form
              form={form}
              layout="vertical"
              className="selection-form"
            >
              <Form.Item
                label="Trường đại học"
                name="university"
                rules={[{ required: true, message: 'Vui lòng chọn trường đại học' }]}
              >
                <Select
                  placeholder="Chọn trường đại học"
                  loading={universitiesLoading}
                  onChange={handleUniversityChange}
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {universities.map((university: University) => (
                    <Option key={university._id} value={university._id}>
                      {university.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Ngành học"
                name="major"
                rules={[{ required: true, message: 'Vui lòng chọn ngành học' }]}
              >
                <Select
                  placeholder={selectedUniversity ? "Chọn ngành học" : "Vui lòng chọn trường đại học trước"}
                  loading={majorsLoading}
                  onChange={handleMajorChange}
                  disabled={!selectedUniversity}
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {universityMajors
                    .filter(major => major.admission_methods.includes(admissionMethod))
                    .map(major => (
                      <Option key={major._id} value={major._id}>
                        {major.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              {selectedMajor && needsSubjectCombination && (
                <Form.Item
                  label="Tổ hợp xét tuyển"
                  name="combination"
                  rules={[{ required: true, message: 'Vui lòng chọn tổ hợp xét tuyển' }]}
                >
                  <Select
                    placeholder={selectedMajor ? "Chọn tổ hợp xét tuyển" : "Vui lòng chọn ngành học trước"}
                    loading={combinationsLoading}
                    onChange={handleCombinationChange}
                    disabled={!selectedMajor}
                    size="large"
                  >
                    {getAvailableCombinations().map(combination => (
                      <Option key={combination._id} value={combination._id}>
                        {combination.code} ({combination.subjects.join(', ')})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </Form>

            { selectedMajor && needsSubjectCombination && (
              <Alert
                message="Lưu ý về tổ hợp xét tuyển"
                description="Tổ hợp xét tuyển sẽ được sử dụng để tính điểm xét tuyển. Vui lòng chọn tổ hợp phù hợp với điểm số của bạn."
                type="warning"
                showIcon
                className="combination-note"
              />
            )}
          </div>

          <div className="card-footer">
            <Button onClick={handleBack}>
              <ArrowLeftOutlined />
              Quay lại
            </Button>
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              disabled={!isFormValid()}
            >
              Tiếp tục
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Step2Page;