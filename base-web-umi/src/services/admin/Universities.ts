import request from '@/utils/axios';

// Lấy danh sách tất cả các trường đại học
export async function getAllUniversities() {
  return request('http://localhost:3456/admin/universities', { method: 'GET' });
}

// Lấy thông tin chi tiết một trường đại học theo ID
export async function getUniversityDetail(id: string) {
  return request(`http://localhost:3456/admin/universities/${id}`, { method: 'GET' });
}

// Tạo mới một trường đại học
export async function createUniversity(data: any) {
  return request('http://localhost:3456/admin/universities', {
    method: 'POST',
    data,
  });
}

// Cập nhật thông tin một trường đại học
export async function updateUniversity(id: string, data: any) {
  return request(`http://localhost:3456/admin/universities/${id}`, {
    method: 'PUT',
    data,
  });
}

// Xóa một trường đại học
export async function deleteUniversity(id: string) {
  return request(`http://localhost:3456/admin/universities/${id}`, {
    method: 'DELETE',
  });
}
