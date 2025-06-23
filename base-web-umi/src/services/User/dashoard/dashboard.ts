import axios from '@/utils/axios';

// ===== BASE URL =====
const USER_BASE_URL = 'http://localhost:3456/users';
const APPLICATION_BASE_URL = `${USER_BASE_URL}/applications`;

// Lấy thông tin user
export async function getUserProfile() {
  const response = await axios.get(`${USER_BASE_URL}/profile`);
  return response.data;
}

// Lấy danh sách hồ sơ xét tuyển
export async function getAdmissionList() {
  const response = await axios.get(APPLICATION_BASE_URL);
  return response.data;
}
