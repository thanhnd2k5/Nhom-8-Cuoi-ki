import request from '@/utils/axios';

// Lấy danh sách ngành học theo trường đại học
export async function getMajorsByUniversity(universityId: string) {
  return request(`http://localhost:3456/admin/university-majors/${universityId}`, { method: 'GET' });
}

// Thêm ngành học cho một trường đại học
export async function createMajorForUniversity(universityId: string, data: any) {
  return request(`http://localhost:3456/admin/university-majors/`, {
    method: 'POST',
    data,
  });
}

// Sửa thông tin ngành học
export async function updateMajorForUniversity(universityId: string, majorId: string, data: any) {
  return request(`http://localhost:3456/admin/university-majors/`, {
    method: 'PUT',
    data,
  });
}

// Xóa ngành học
export async function deleteMajorForUniversity(universityId: string, majorId: string) {
  return request(`http://localhost:3456/admin/university-majors/`, {
    method: 'DELETE',
  });
}
