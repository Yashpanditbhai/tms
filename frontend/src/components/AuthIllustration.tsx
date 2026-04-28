import React from 'react';
import authIllustration from '../assets/auth-illustration.svg';

const AuthIllustration: React.FC = () => {
  return (
    <div
      className="hidden lg:block w-[55%] shrink-0"
      style={{
        height: '100vh',
        background: `#e8e0f0 url(${authIllustration}) center center / cover no-repeat`,
      }}
    />
  );
};

export default AuthIllustration;
