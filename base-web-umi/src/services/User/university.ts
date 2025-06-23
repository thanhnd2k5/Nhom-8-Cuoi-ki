import axios from '@/utils/axios';

const BASE_URL = 'http://localhost:3456/users/universities';

interface University {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    code: string;
    address: string;
    majors: Array<{
      _id: string;
      name: string;
      code: string;
      admission_methods: string[];
    }>;
  }[];
}

// Lấy tất cả các trường đại học
export const getUniversities = async (): Promise<University> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Lấy các trường theo phương thức xét tuyển
export const getUniversitiesByAdmissionMethod = async (
  admissionMethod: string
): Promise<University> => {
  const response = await axios.get(`${BASE_URL}/admission-method`, {
    params: { admissionMethod },
  });
  return response.data;
};
