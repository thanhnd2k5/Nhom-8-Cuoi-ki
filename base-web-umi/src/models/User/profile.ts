import { getUserProfile, updateUserProfile, getHighSchoolProfile, updateHighSchoolProfile} from '@/services/User/profile';   

import moment from 'moment';

export async function fetchProfileData() {
  const res = await getUserProfile();
  return res.data || {};
}

export async function saveProfileData(data: any) {
  return updateUserProfile(data);
}

export async function fetchHighSchoolProfile() {
  const res = await getHighSchoolProfile();
  return res.data || {};
}

export async function saveHighSchoolProfile(data: any) {
  return updateHighSchoolProfile(data);
}

