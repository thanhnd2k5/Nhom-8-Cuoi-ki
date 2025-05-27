import request from '@/utils/axios';

const BASE_URL = 'http://localhost:3456/admin/university-majors';

// Lấy danh sách ngành học của 1 trường đại học cụ thể (bạn truyền universityId vào URL)
export async function getMajorsByUniversity(universityId: string) {
  return request(`${BASE_URL}/${universityId}/majors`, {
    method: 'GET',
  });
}

// Thêm ngành học mới cho một trường đại học cụ thể
export async function createMajorForUniversity(universityId: string, data: any) {
  return request(`${BASE_URL}/${universityId}/majors`, {
    method: 'POST',
    data,
  });
}

// Cập nhật thông tin ngành học của một trường đại học
export async function updateMajorForUniversity(universityId: string, majorId: string, data: any) {
  return request(`${BASE_URL}/${universityId}/majors/${majorId}`, {
    method: 'PUT',
    data,
  });
}

// Xóa ngành học khỏi một trường đại học
export async function deleteMajorForUniversity(universityId: string, majorId: string) {
  return request(`${BASE_URL}/${universityId}/majors/${majorId}`, {
    method: 'DELETE',
  });
}
