import * as service from '@/services/admin/SubjectCombinations';

// Lấy danh sách tất cả tổ hợp môn
export async function fetchSubjectCombinations() {
  const res = await service.getAllSubjectCombinations();
  return res.data || [];
}

// Lấy chi tiết một tổ hợp môn theo id
export async function fetchSubjectCombinationDetail(id: string) {
  const res = await service.getSubjectCombinationDetail(id);
  return res.data || {};
}

// Thêm mới tổ hợp môn
export async function addSubjectCombination(data: any) {
  const res = await service.createSubjectCombination(data);
  return res.data;
}

// Cập nhật tổ hợp môn theo id
export async function editSubjectCombination(id: string, data: any) {
  const res = await service.updateSubjectCombination(id, data);
  return res.data;
}

// Xóa tổ hợp môn theo id
export async function removeSubjectCombination(id: string) {
  const res = await service.deleteSubjectCombination(id);
  return res.data;
}
