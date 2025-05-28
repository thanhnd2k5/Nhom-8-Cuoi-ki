import React from 'react';
const WelcomeBox = ({ name }: { name: string }) => (
  <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
    Xin chào, {name}
  </h2>
);
export default WelcomeBox;
