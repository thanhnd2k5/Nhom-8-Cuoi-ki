import * as service from '@/services/admin/Statistics';

// Lấy thống kê số lượng hồ sơ theo trường, ngành, trạng thái
export async function fetchStatistics() {
  const res = await service.getStatistics();
  return res.data || {};
}
