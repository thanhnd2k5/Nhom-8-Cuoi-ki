import React, { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/models/User/dashboard';
import WelcomeBox from './components/WelcomeBox';
import StatsBox from './components/StatsBox';
import AdmissionList from './components/AdmissionList';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [stats, setStats] = useState<any>({});
  const [admissions, setAdmissions] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData().then(({ user, stats, admissions }) => {
      console.log('User', user);
      setUser(user);
      setStats(stats);
      setAdmissions(admissions);
    });
  }, []);

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
     <WelcomeBox name={user?.data?.name || ''} />
      <StatsBox stats={stats} />
      <AdmissionList admissions={admissions} />
    </div>
  );
};

export default Dashboard;
