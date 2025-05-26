import * as service from '@/services/User/admission';

// Lấy danh sách đơn xét tuyển
export async function fetchApplications() {
  const res = await service.getApplications();
  return res.data || [];
}

// Lấy chi tiết đơn xét tuyển
export async function fetchApplicationDetail(id: string) {
  const res = await service.getApplicationDetail(id);
  return res.data || {};
}

// Tạo mới đơn xét tuyển
export async function submitApplication(data: any) {
  return service.createApplication(data);
}

// Sửa đơn xét tuyển
export async function editApplication(id: string, data: any) {
  return service.updateApplication(id, data);
}

// Xoá đơn xét tuyển
export async function removeApplication(id: string) {
  return service.deleteApplication(id);
}

// Lấy danh sách trường đại học
export async function fetchUniversities() {
  const res = await service.getUniversities();
  return res.data || [];
}

// Lấy danh sách ngành
export async function fetchMajors() {
  const res = await service.getUniversityMajors();
  return res.data || [];
}

// Lấy danh sách tổ hợp môn
export async function fetchSubjectCombinations() {
  const res = await service.getSubjectCombinations();
  return res.data || [];
}
