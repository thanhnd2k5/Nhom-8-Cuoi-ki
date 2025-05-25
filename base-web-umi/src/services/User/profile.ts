import request from '@/utils/axios';

// Lấy thông tin hồ sơ cá nhân
export async function getUserProfile() {
  return request('http://localhost:3456/users/profile', { method: 'GET' });
}

// Cập nhật thông tin hồ sơ cá nhân
export async function updateUserProfile(data: any) {
  return request('http://localhost:3456/users/profile', {
    method: 'PUT',
    data,
  });
}

export async function getHighSchoolProfile() {
  return request('http://localhost:3456/users/high-school-profile', { method: 'GET' });
}

// Cập nhật thông tin học tập
export async function updateHighSchoolProfile(data: any) {
  return request('http://localhost:3456/users/high-school-profile', {
    method: 'PUT',
    data,
  });
}


