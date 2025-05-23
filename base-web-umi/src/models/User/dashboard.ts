import { getUserProfile, getAdmissionList } from '@/services/User/dashoard/dashboard';

export async function fetchDashboardData() {
  const [user, admissions] = await Promise.all([
    getUserProfile(),
    getAdmissionList(),
  ]);
  
  // Tính toán số lượng hồ sơ theo trạng thái
  const admissionsArray = Array.isArray(admissions)
  ? admissions
  : (admissions?.data && Array.isArray(admissions.data) ? admissions.data : []);

  const stats = {
    created: admissionsArray.length,
    pending: admissionsArray.filter((a: any) => a.status === 'pending').length,
    approved: admissionsArray.filter((a: any) => a.status === 'approved').length,
    notifications: 3, // Nếu có API thông báo thì lấy từ API, tạm hardcode
  };
  return { user, admissions:admissionsArray, stats };
}
