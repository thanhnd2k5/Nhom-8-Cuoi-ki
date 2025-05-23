import { getUserProfile, updateUserProfile } from '@/services/User/profile';

export async function fetchProfileData() {
  const res = await getUserProfile();
  // Nếu API trả về { data: {...} }
  return res.data || {};
}

export async function saveProfileData(data: any) {
  const res = await updateUserProfile(data);
  return res;
}
