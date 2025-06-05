import React, { useState, useEffect } from 'react';

const WelcomeBox = ({ name }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
      borderRadius: 20,
      padding: 32,
      marginBottom: 32,
      boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 160,
        height: 160,
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%'
      }}></div>
      
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <h1 style={{ 
            fontSize: 32, 
            fontWeight: 700, 
            margin: 0, 
            marginBottom: 8,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {getGreeting()}, {name || 'Bạn'}! 👋
          </h1>
          <p style={{ 
            fontSize: 18, 
            margin: 0, 
            marginBottom: 16, 
            opacity: 0.9 
          }}>
            Chúc bạn có một ngày làm việc hiệu quả và thành công
          </p>
          <div style={{ 
            fontSize: 14, 
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            📅 {currentTime.toLocaleDateString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: 48, 
            fontWeight: 700, 
            marginBottom: 8,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {currentTime.toLocaleTimeString('vi-VN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>
            {currentTime.getSeconds().toString().padStart(2, '0')}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;