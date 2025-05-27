import request from '@/utils/axios';

// Lấy thống kê số lượng hồ sơ theo trường, ngành, trạng thái
export async function getStatistics() {
  return request('https://echo.hoppscotch.io', {
    method: 'GET',
  });
}
