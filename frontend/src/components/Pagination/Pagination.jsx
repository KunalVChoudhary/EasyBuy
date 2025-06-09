import React from 'react'

function Pagination({props}) {

    const {currentPageNo, totalPages, searchParams, setSearchParams} = props;

    const nextPage = (pageNo) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', pageNo);
        setSearchParams(newParams);
    };

    const handlePageClick = (pageNo) => {
        
        if (pageNo >= 1 && pageNo <= totalPages && pageNo !== currentPageNo) {
            nextPage(pageNo);
        }
    };

  return (   
    <>
        <ul className="pagination">

            <li className={`page-item ${currentPageNo === 1 ? 'disabled' : ''} `}>
                <button className="page-link d-flex justify-content-center align-items-center" onClick={() => handlePageClick(currentPageNo - 1)} disabled={currentPageNo === 1}>
                    Previous
                </button>
            </li>

            {currentPageNo > 2 && (
                <li className="page-item disabled ">
                    <span className="page-link d-flex justify-content-center align-items-center "><p className='m-0'>...</p></span>
                </li>
            )}

            {currentPageNo > 1 && (
                <li className="page-item ">
                    <button className="page-link d-flex justify-content-center align-items-center" onClick={() => handlePageClick(currentPageNo - 1)}>
                        {currentPageNo - 1}
                    </button>
                </li>
            )}

            <li className="page-item active ">
                <span className="page-link d-flex justify-content-center align-items-center">{currentPageNo}</span>
            </li>

            {currentPageNo < totalPages && (
                <li className="page-item ">
                    <button className="page-link d-flex justify-content-center align-items-center" onClick={() => handlePageClick(currentPageNo + 1)}>
                        {currentPageNo + 1}
                    </button>
                </li>
            )}
            
            {((currentPageNo+1)<totalPages)?
              (
                <li className="page-item disabled ">
                    <span className="page-link d-flex justify-content-center align-items-center"><p className='m-0'>...</p></span>
                </li> 
              )
              :
              ''}
            <li className={`page-item ${((currentPageNo)!=totalPages)? '':'disabled'} `}>
                <button className="page-link d-flex justify-content-center align-items-center" onClick={() => handlePageClick(currentPageNo + 1)} >
                    Next
                </button>
            </li>

          </ul>
    </>
  )
}

export default Pagination