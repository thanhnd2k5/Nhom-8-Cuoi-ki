import axios from '@/utils/axios';
import { request } from 'umi';

export interface Application {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  universityMajorId: {
    _id: string;
    university_id: string;
    name: string;
    code: string;
    admission_methods: string[];
    subject_combination_ids: string[];
  };
  admissionMethod: string;
  subjectCombinationId: {
    _id: string;
    code: string;
    subjects: string[];
  };
  status: 'cho_duyet' | 'da_duyet' | 'tu_choi';
  created_at: string;
  updated_at: string;
}

export interface ApplicationsResponse {
  status: number;
  success: boolean;
  message: string;
  data: Application[];
}

export interface UpdateStatusRequest {
  status: 'da_duyet' | 'tu_choi';
}

export interface GroupedApplication {
  majorId: string;
  majorName: string;
  universityName: string;
  applications: Application[];
}

export interface GroupedApplicationsResponse {
  status: number;
  success: boolean;
  message: string;
  data: GroupedApplication[];
}

// ===== BASE URL =====
const ADMIN_BASE_URL = 'http://localhost:3456/admin/applications';
const USER_BASE_URL = 'http://localhost:3456/users/applications';

// ===== API functions =====

// Get all applications
export async function getAllApplications() {
  const response = await axios.get<ApplicationsResponse>(`${ADMIN_BASE_URL}`);
  return response.data;
}

// Get applications by university
export async function getApplicationsByUniversity(universityId: string) {
  const response = await axios.get<ApplicationsResponse>(`${ADMIN_BASE_URL}/university/${universityId}`);
  return response.data;
}

// Update application status
export async function updateApplicationStatus(applicationId: string, data: UpdateStatusRequest) {
  const response = await axios.patch<ApplicationsResponse>(`${ADMIN_BASE_URL}/${applicationId}/status`, data);
  return response.data;
}

// Get complete application by ID (from user-side API)
export async function getCompleteApplicationById(applicationId: string) {
  const response = await request(`${USER_BASE_URL}/complete/${applicationId}`, {
    method: 'GET',
  });
  return response.data;
}

// Get applications grouped by major of university
export async function getApplicationsGroupedByMajorOfUniversity(universityId: string) {
  const response = await axios.get<GroupedApplicationsResponse>(
    `${ADMIN_BASE_URL}/university/${universityId}/grouped-by-major`
  );
  return response.data;
}
