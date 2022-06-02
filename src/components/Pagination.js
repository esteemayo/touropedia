import { MDBPagination, MDBPaginationItem, MDBBtn } from 'mdb-react-ui-kit';

const Pagination = ({
  setCurrentpage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage === 1) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>1</p>
          </MDBPaginationItem>
          <MDBPagination>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentpage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPagination>
        </MDBPagination>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentpage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentpage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      // last page (and no tours no diplay === just display a prev btn)
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentpage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className='mt-4'>{renderPagination()}</div>;
};

export default Pagination;
