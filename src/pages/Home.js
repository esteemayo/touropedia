import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';

import Spinner from 'components/Spinner';
import CardTour from 'components/CardTour';
import Pagination from 'components/Pagination';
import { fetchTours, setCurrentPage } from 'features/tour/tourSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const { tours, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );

  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchTours(currentPage));
  }, [dispatch, currentPage]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <MDBRow className='mt-5'>
        {tours.length === 0 && pathname === '/' && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Tours Found
          </MDBTypography>
        )}

        {tours.length === 0 && pathname !== '/' && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            We coundn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
              {tours &&
                tours.map((item) => {
                  return <CardTour key={item._id} {...item} />;
                })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && (
        <Pagination
          setCurrentpage={setCurrentPage}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          dispatch={dispatch}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  padding: 15px;
  margin-top: 50px;
  max-width: 1000px;
  align-content: center;
`;

export default Home;
