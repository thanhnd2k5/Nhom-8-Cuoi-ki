import { useState, useCallback } from 'react';
import { message } from 'antd';
import { getCompleteApplicationById } from '@/services/User/applications';
import { ApplicationDetailResponse } from '@/pages/User/DetailApplications/types';

export interface DetailApplicationState {
  data: ApplicationDetailResponse | null;
  loading: boolean;
  error: string | null;
}

export default () => {
  const [state, setState] = useState<DetailApplicationState>({
    data: null,
    loading: false,
    error: null,
  });

  // Fetch chi tiết đơn xét tuyển
  const fetchApplicationDetail = useCallback(async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await getCompleteApplicationById(id);
      
      if (response?.data) {
        setState(prev => ({ ...prev, data: response.data }));
      } else {
        throw new Error('Không thể tải chi tiết hồ sơ');
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message || 'Lỗi khi tải chi tiết hồ sơ' 
      }));
      message.error(error.message || 'Lỗi khi tải chi tiết hồ sơ');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Chuẩn hóa data cho UI
  const getNormalizedData = useCallback(() => {
    if (!state.data) return null;

    const { application, applicationResult, documents, profile } = state.data;   
    const isHocBa = (applicationResult?.method || application?.admissionMethod) === 'hoc_ba';
    let totalScore = applicationResult?.totalScore;

    if (isHocBa) {
      // Nếu totalScore là 0 hoặc undefined, tự tính lại
      const g10 = applicationResult?.gpaGrade10 || 0;
      const g11 = applicationResult?.gpaGrade11 || 0;
      const g12 = applicationResult?.gpaGrade12 || 0;
      totalScore = g10 + g11 + g12;
    }

    return {
      university: application.universityMajorId.name,
      major: application.universityMajorId.name,
      combination: application.subjectCombinationId.code,
      status: application.status,
      dates: {
        submitted: new Date(application.created_at).toLocaleString(),
        updated: new Date(application.updated_at).toLocaleString(),
      },
      scores: {
        ...(applicationResult.gpaGrade10 !== undefined && { 'GPA 10': applicationResult.gpaGrade10 }),
        ...(applicationResult.gpaGrade11 !== undefined && { 'GPA 11': applicationResult.gpaGrade11 }),
        ...(applicationResult.gpaGrade12 !== undefined && { 'GPA 12': applicationResult.gpaGrade12 }),
      },
      totalScore,
      method: applicationResult?.method || application?.admissionMethod || '',
      priority: {
        area: profile?.priorityArea || '',
        group: profile?.priorityGroup || '',
        score: applicationResult?.priorityScore || 0,
      },
      documents: documents.map(doc => ({
        name: doc.fileUrl.split('/').pop() || '',
        type: doc.fileType,
        size: '0 KB',
        url: doc.fileUrl
      }))
    };
  }, [state.data]);

  return {
    ...state,
    fetchApplicationDetail,
    getNormalizedData,
  };
}; 