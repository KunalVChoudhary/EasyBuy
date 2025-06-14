import React from 'react'

function LogOutResult( {logOutResult, setLogOutResult}) {

    
  return (
    <div className='w-100 p-2'>
      <div className='my-1 d-flex align-items-center'>
        <div><img src="images/App-icon.png" className="rounded mx-1" alt="..."/></div>
        <div className='flex-grow-1 d-flex justify-content-between'>
          <div><strong className="px-1 me-4">Important</strong></div>
          <div>
            <button type="button" className="btn-close ps-1" onClick={()=>{setLogOutResult(false,'')}}/>
          </div>
        </div>
      </div>
      <hr />
      <div className='m-2'>
        <p className='p-0 m-0'>{logOutResult[1]}</p>
      </div>
    </div>
  )
}

export default LogOutResult