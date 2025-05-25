import React from 'react';

const WelcomeBox = ({ name }: { name: string }) => (
  <h2 style={{
    fontWeight: 700,
    fontSize: 22,
    marginBottom: 20,
    color: '#222',
    borderBottom: '2.5px solid #c00',
    display: 'inline-block',
    paddingBottom: 4
  }}>
    Xin chào, {name}
  </h2>
);

export default WelcomeBox;
