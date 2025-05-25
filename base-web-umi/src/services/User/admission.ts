import request from '@/utils/axios';

// Lấy danh sách đơn xét tuyển
export async function getApplications() {
  return request('http://localhost:3456/users/applications', { method: 'GET' });
}

// Lấy chi tiết đơn xét tuyển
export async function getApplicationDetail(id: string) {
  return request(`http://localhost:3456/users/applications/${id}`, { method: 'GET' });
}

// Tạo mới đơn xét tuyển
export async function createApplication(data: any) {
  return request('http://localhost:3456/users/applications', { method: 'POST', data });
}

// Sửa đơn xét tuyển
export async function updateApplication(id: string, data: any) {
  return request(`http://localhost:3456/users/applications/${id}`, { method: 'PUT', data });
}

// Xoá đơn xét tuyển
export async function deleteApplication(id: string) {
  return request(`http://localhost:3456/users/applications/${id}`, { method: 'DELETE' });
}
