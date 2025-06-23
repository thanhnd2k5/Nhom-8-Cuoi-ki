import axios from '@/utils/axios';

const BASE_URL = 'http://localhost:3456/users/university-majors';

export interface UniversityMajor {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    code: string;
    admission_methods: string[];
    subject_combination_ids: string[];
  }[];
}

export const getUniversityMajors = async (universityId: string): Promise<UniversityMajor> => {
  const response = await axios.get(`${BASE_URL}/${universityId}`);
  return response.data;
};
