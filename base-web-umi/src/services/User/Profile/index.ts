import axios from '@/utils/axios';

// ===== BASE URL =====
const USER_BASE_URL = 'http://localhost:3456/users';
const PROFILE_URL = `${USER_BASE_URL}/profile`;
const HIGH_SCHOOL_PROFILE_URL = `${USER_BASE_URL}/high-school-profile`;

// Types cho API responses
export interface UserProfileResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dob: string | null;
    avatar: string;
    cccd: string;
    phone: string;
    ethnic: string;
    province: string;
    district: string;
    address: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export interface HighSchoolProfileResponse {
  success: boolean;
  data: {
    _id: string;
    userId: string;
    created_at: string;
    gpaGrade10: number | null;
    gpaGrade11: number | null;
    gpaGrade12: number | null;
    graduationYear: number | null;
    highSchoolName: string;
    priorityArea: string;
    priorityGroup: string;
    updated_at: string;
  };
}

// Request types
export interface UpdateUserProfileRequest {
  name?: string;
  email: string;
  gender?: string;
  dob?: string;
  cccd?: string;
  phone?: string;
  ethnic?: string;
  province?: string;
  district?: string;
  address?: string;
}

export interface UpdateHighSchoolProfileRequest {
  gpaGrade10?: number | null;
  gpaGrade11?: number | null;
  gpaGrade12?: number | null;
  graduationYear?: number | null;
  highSchoolName?: string;
  priorityArea?: string;
  priorityGroup?: string;
}

// API functions

export async function getUserProfile(): Promise<UserProfileResponse> {
  const response = await axios.get(PROFILE_URL);
  return response.data;
}

export async function updateUserProfile(data: UpdateUserProfileR)
