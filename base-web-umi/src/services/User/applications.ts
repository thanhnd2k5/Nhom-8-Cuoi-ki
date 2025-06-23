import axios from '@/utils/axios';

// ===== BASE URL =====
const APPLICATION_BASE_URL = 'http://localhost:3456/users/applications';
const DOCUMENT_BASE_URL = 'http://localhost:3456/users/documents';

export interface ApplicationResponse {
  status: number;
  success: boolean;
  message: string;
  data: any[];
}

export interface CompleteApplicationData {
  universityMajorId: string;
  admissionMethod: string;
  subjectCombinationId?: string;
  resultData: {
    method: string;
    gpaGrade10?: number;
    gpaGrade11?: number;
    gpaGrade12?: number;
    subjectScores?: Record<string, number>;
    totalScore?: number;
  };
  documentsData: {
    type: string;
    file: string;
    fileType: string;
  }[];
}

// Lấy danh sách hồ sơ
export async function getApplications(): Promise<ApplicationResponse> {
  const response = await axios.get(APPLICATION_BASE_URL);
  return response.data;
}

// Lấy chi tiết hồ sơ theo ID
export async function getApplicationDetail(id: string) {
  const response = await axios.get(`${APPLICATION_BASE_URL}/${id}`);
  return response.data;
}

// Tạo hồ sơ mới
export async function createApplication(data: any) {
  const response = await axios.post(APPLICATION_BASE_URL, data);
  return response.data;
}

// Cập nhật hồ sơ
export async function updateApplication(id: string, data: any) {
  const response = await axios.put(`${APPLICATION_BASE_URL}/${id}`, data);
  return response.data;
}

// Xoá hồ sơ
export async function deleteApplication(id: string) {
  const response = await axios.delete(`${APPLICATION_BASE_URL}/${id}`);
  return response.data;
}

// Tạo hồ sơ hoàn chỉnh
export async function createCompleteApplication(data: any) {
  const response = await axios.post(`${APPLICATION_BASE_URL}/complete`, data);
  return response.data;
}

// Upload tài liệu
export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(DOCUMENT_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

// Tìm kiếm hồ sơ theo điều kiện
export async function searchApplications(filters: {
  universityId?: string;
  applicationCode?: string;
  status?: string;
  admissionMethod?: string;
  startDate?: string;
  endDate?: string;
}): Promise<ApplicationResponse> {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  const response = await axios.get(`${APPLICATION_BASE_URL}/search?${queryParams.toString()}`);
  return response.data;
}

// Lấy hồ sơ hoàn chỉnh theo ID
export async function getCompleteApplicationById(applicationId: string) {
  const response = await axios.get(`${APPLICATION_BASE_URL}/complete/${applicationId}`);
  return response.data;
}
