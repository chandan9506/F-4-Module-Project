import React from 'react';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ marginBottom: '10px' }}></div>
        <p>Loading... Please Wait...</p>
      </div>
    </div>
  );
};

export default Loading;