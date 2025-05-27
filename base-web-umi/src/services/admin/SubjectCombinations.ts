import request from '@/utils/axios';

// Lấy danh sách tất cả tổ hợp môn
export async function getAllSubjectCombinations() {
  return request('http://localhost:3456/admin/subject-combinations', { method: 'GET' });
}

// Lấy chi tiết một tổ hợp môn theo id
export async function getSubjectCombinationDetail(id: string) {
  return request(`http://localhost:3456/admin/subject-combinations/${id}`, { method: 'GET' });
}

// Thêm mới tổ hợp môn
export async function createSubjectCombination(data: any) {
  return request('http://localhost:3456/admin/subject-combinations/', {
    method: 'POST',
    data,
  });
}

// Cập nhật tổ hợp môn theo id
export async function updateSubjectCombination(id: string, data: any) {
  return request(`http://localhost:3456/admin/subject-combinations/${id}`, {
    method: 'PUT',
    data,
  });
}

// Xóa tổ hợp môn theo id
export async function deleteSubjectCombination(id: string) {
  return request(`http://localhost:3456/admin/subject-combinations/${id}`, {
    method: 'DELETE',
  });
}
