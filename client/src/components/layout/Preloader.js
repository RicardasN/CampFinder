import React from 'react';

const Preloader = () => {
  return (
    <div className="progress blue" style={{ marginTop: '100px' }}>
      <div className="indeterminate lighten-4"></div>
    </div>
  );
};

export default Preloader;
