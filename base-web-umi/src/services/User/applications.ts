import request from '@/utils/axios';

export interface ApplicationResponse {
  status: number;
  success: boolean;
  message: string;
  data: any[];
}

export async function getApplications(): Promise<ApplicationResponse> {
  const response = await request('http://localhost:3456/users/applications', {
    method: 'GET',
  });
  return response.data;
}

export async function getApplicationDetail(id: string) {
  const response = await request(`http://localhost:3456/users/applications/${id}`, {
    method: 'GET',
  });
  return response.data;
}

export async function createApplication(data: any) {
  const response = await request('http://localhost:3456/users/applications', {
    method: 'POST',
    data,
  });
  return response.data;
}

export async function updateApplication(id: string, data: any) {
  const response = await request(`http://localhost:3456/users/applications/${id}`, {
    method: 'PUT',
    data,
  });
  return response.data;
}

export async function deleteApplication(id: string) {
  const response = await request(`http://localhost:3456/users/applications/${id}`, {
    method: 'DELETE',
  });
  return response.data;
} 