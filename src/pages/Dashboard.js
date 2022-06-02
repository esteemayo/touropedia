import { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from 'mdb-react-ui-kit';

import { excerpt } from 'utils';
import Spinner from 'components/Spinner';
import { fetchToursByUser, removeTour } from 'features/tour/tourSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      dispatch(removeTour({ id, toast }));
    }
  };

  useEffect(() => {
    dispatch(fetchToursByUser());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      {userTours.length === 0 && (
        <h3>
          No tour available with the user: {user?.name || user?.user?.name}
        </h3>
      )}
      {userTours.length > 0 && (
        <>
          <h4 className='text-center'>
            Dashboard: {user?.name || user?.user?.name}
          </h4>
          <Hr />
        </>
      )}
      {userTours &&
        userTours.map((item) => {
          const { _id: id, image, title, description } = item;
          return (
            <MDBCardGroup key={id}>
              <MDBCard style={{ maxWidth: '600px' }} className='mt-2'>
                <MDBRow className='g-0'>
                  <MDBCol md='4'>
                    <MDBCardImage className='rounded' src={image} fluid />
                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBCardBody>
                      <MDBCardTitle className='text-start'>
                        {title}
                      </MDBCardTitle>
                      <MDBCardText className='text-start'>
                        <small className='text-muted'>
                          {excerpt(description, 40)}
                        </small>
                      </MDBCardText>
                      <Wrapper>
                        <MDBBtn className='mt-1' tag='a' color='none'>
                          <MDBIcon
                            fas
                            icon='trash'
                            style={{ color: '#dd4b39' }}
                            size='lg'
                            onClick={() => handleDelete(id)}
                          />
                        </MDBBtn>
                        <Link to={`/edit-tour/${id}`}>
                          <MDBIcon
                            fas
                            icon='edit'
                            style={{ color: '#55acee', marginLeft: '10px' }}
                            size='lg'
                          />
                        </Link>
                      </Wrapper>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  padding: 120px;
  max-width: 900px;
  align-content: center;
`;

const Hr = styled.hr`
  max-width: 570px;
`;

const Wrapper = styled.div`
  margin-left: 5px;
  float: right;
  margin-top: -60px;
`;

export default Dashboard;
