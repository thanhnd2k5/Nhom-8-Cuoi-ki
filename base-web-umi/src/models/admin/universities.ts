import * as service from '@/services/admin/Universities';

// Lấy danh sách tất cả các trường đại học
export async function fetchUniversities() {
  const res = await service.getAllUniversities();
  return res.data || [];
}

// Lấy chi tiết trường đại học theo ID
export async function fetchUniversityDetail(id: string) {
  const res = await service.getUniversityDetail(id);
  return res.data || {};
}

// Tạo mới trường đại học
export async function createUniversity(data: any) {
  return service.createUniversity(data);
}

// Cập nhật thông tin trường đại học theo ID
export async function updateUniversity(id: string, data: any) {
  return service.updateUniversity(id, data);
}

// Xóa trường đại học theo ID
export async function deleteUniversity(id: string) {
  return service.deleteUniversity(id);
}
