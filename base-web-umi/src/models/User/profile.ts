import { getUserProfile, updateUserProfile, getHighSchoolProfile, updateHighSchoolProfile } from '@/services/User/profile';
import moment from 'moment';

export async function fetchProfileData() {
  const res = await getUserProfile();
  // Xử lý dữ liệu nếu cần
  return res.data || {};
}

export async function saveProfileData(data: any) {
  // Xử lý dữ liệu trước khi gửi lên server nếu cần
  return updateUserProfile(data);
}

export async function fetchHighSchoolProfile() {
  const res = await getHighSchoolProfile();
  return res.data || {};
}

export async function saveHighSchoolProfile(data: any) {
  return updateHighSchoolProfile(data);
}