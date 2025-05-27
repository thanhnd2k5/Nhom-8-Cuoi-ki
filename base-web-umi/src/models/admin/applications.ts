import * as service from '@/services/admin/Applications';

// Lấy danh sách tất cả đơn xét tuyển, có thể kèm filter, paging
export async function fetchApplications(params?: {
  universityId?: string;
  majorId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const res = await service.getAllApplications(params);
  return res.data || [];
}

// Cập nhật trạng thái đơn xét tuyển theo id
export async function changeApplicationStatus(
  id: string,
  data: { status: string; notes?: string }
) {
  const res = await service.updateApplicationStatus(id, data);
  return res.data;
}
