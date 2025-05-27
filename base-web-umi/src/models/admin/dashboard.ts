import * as service from '@/services/admin/dashboard';

// Lấy danh sách đơn xét tuyển
export async function fetchApplications(params?: {
  universityId?: string;
  majorId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const res = await service.getAllApplications();
  // Nếu API chưa hỗ trợ params filter, paging thì gọi thẳng như trên
  // Nếu có params, bạn nên chỉnh API getAllApplications nhận params và truyền xuống request
  return res.data || [];
}

// Lấy danh sách trường đại học
export async function fetchUniversities() {
  const res = await service.getAllUniversities();
  return res.data || [];
}

// Lấy danh sách ngành đại học theo trường (có thể tách thêm param nếu muốn)
export async function fetchMajors() {
  const res = await service.getAllMajors();
  return res.data || [];
}

// Lấy danh sách tổ hợp môn
export async function fetchSubjectCombinations() {
  const res = await service.getAllSubjectCombinations();
  return res.data || [];
}
