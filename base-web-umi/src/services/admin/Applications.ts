import request from '@/utils/axios';

// Lấy danh sách tất cả đơn xét tuyển, có thể có params filter/paging
export async function getAllApplications(params?: {
  universityId?: string;
  majorId?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  return request('http://localhost:3456/admin/applications', {
    method: 'GET',
    params,
  });
}

// Cập nhật trạng thái đơn xét tuyển theo id
export async function updateApplicationStatus(
  id: string,
  data: { status: string; notes?: string }
) {
  return request(`http://localhost:3456/admin/applications/${id}/status`, {
    method: 'PATCH',
    data,
  });
}
