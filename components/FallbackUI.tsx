import React from 'react';

const FallbackUI = () => (
  <div className="container mt-5">
    <div className="d-flex justify-content-center align-middle">
      <div className="card mt-5">
        <p className='p-5 fs-1'>Oops!! Something Went Wrong!</p>
        <p className='text-center p-2'>Please try to refresh the page</p>
        <div className='d-flex justify-content-center'>

        <button type='button' className='btn btn-primary m-3 mb-5 w-50'onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
    </div>
  </div>
);

export default FallbackUI;
