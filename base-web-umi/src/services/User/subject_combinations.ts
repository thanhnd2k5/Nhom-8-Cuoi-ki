import axios from '@/utils/axios';

const BASE_URL = 'http://localhost:3456/users/subject-combinations';

export interface SubjectCombination {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    code: string;
    subjects: string[];
  }[];
}

export const getSubjectCombinations = async (): Promise<SubjectCombination> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
