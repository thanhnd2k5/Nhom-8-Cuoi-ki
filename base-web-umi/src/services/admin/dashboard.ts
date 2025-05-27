import request from '@/utils/axios';

// Lấy danh sách đơn xét tuyển
export async function getAllApplications() {
  return request('http://localhost:3456/admin/applications', { method: 'GET' });
}

// Lấy danh sách trường đại học
export async function getAllUniversities() {
  return request('http://localhost:3456/admin/universities', { method: 'GET' });
}

// Lấy danh sách ngành đại học (nếu có API tổng ngành)
export async function getAllMajors() {
  return request('http://localhost:3456/admin/university-majors/682ce3e00a7c208669a7781d/majors', { method: 'GET' }); // hoặc vòng qua các trường
}

// Lấy danh sách tổ hợp môn
export async function getAllSubjectCombinations() {
  return request('http://localhost:3456/admin/subject-combinations', { method: 'GET' });
}
