import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getApplications, getApplicationDetail } from '@/services/User/applications';

export interface Application {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  universityMajorId: {
    _id: string;
    university_id: string;
    name: string;
    code: string;
  };
  admissionMethod: string;
  subjectCombinationId: {
    _id: string;
    code: string;
    subjects: string[];
  };
  status: string;
  created_at: string;
  updated_at: string;
}

export default () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch all applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getApplications();

      if (response.success) {
        setApplications(response.data);
      } else {
        message.error('Không thể tải danh sách hồ sơ');
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch application detail
  const fetchApplicationDetail = useCallback(async (id: string) => {
    try {
      setDetailLoading(true);
      const response = await getApplicationDetail(id);
      
      if (response.success) {
        setCurrentApplication(response.data);
        return response.data;
      } else {
        message.error('Không thể tải chi tiết hồ sơ');
        return null;
      }
    } catch (error) {
      message.error('Lỗi kết nối API');
      console.error('Error fetching application detail:', error);
      return null;
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // Filter applications by status
  const getApplicationsByStatus = useCallback((status: string) => {
    if (status === 'all') return applications;
    return applications.filter(app => app.status === status);
  }, [applications]);

  // Get status counts
  const getStatusCounts = useCallback(() => {
    return {
      all: applications.length,
      cho_duyet: applications.filter(app => app.status === 'cho_duyet').length,
      da_duyet: applications.filter(app => app.status === 'da_duyet').length,
      tu_choi: applications.filter(app => app.status === 'tu_choi').length,
    };
  }, [applications]);

  // Clear current application
  const clearCurrentApplication = useCallback(() => {
    setCurrentApplication(null);
  }, []);

  return {
    // State
    applications,
    loading,
    currentApplication,
    detailLoading,
    
    // Actions
    fetchApplications,
    fetchApplicationDetail,
    getApplicationsByStatus,
    getStatusCounts,
    clearCurrentApplication,
  };
}; 