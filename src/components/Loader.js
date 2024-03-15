import React from 'react'
const Loader = () => {
  return (
    <div className='z-50 fixed top-0 left-0 h-screen w-screen flex justify-center items-center'>
        <span className='h-[100px] aspect-square border-4 border-t-blue-600 animate-spin rounded-full'></span>
    </div>
  )
}

export default Loader