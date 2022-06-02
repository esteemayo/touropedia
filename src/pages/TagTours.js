import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from 'mdb-react-ui-kit';

import { excerpt } from 'utils';
import Spinner from 'components/Spinner';
import { fetchToursByTag } from 'features/tour/tourSlice';

const TagTours = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));

  useEffect(() => {
    tag && dispatch(fetchToursByTag(tag));
  }, [dispatch, tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <h3 className='text-center'>Tours with tag: {tag}</h3>
      <Hr />
      {tagTours &&
        tagTours.map((item) => {
          const { _id: id, image, title, description } = item;
          return (
            <MDBCardGroup key={id}>
              <MDBCard style={{ maxWidth: '600px' }} className='mt-2'>
                <MDBRow className='g-0'>
                  <MDBCol md='4'>
                    <MDBCardImage
                      className='rounded'
                      src={image}
                      alt={title}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBCardBody>
                      <MDBCardTitle className='text-start'>
                        {title}
                      </MDBCardTitle>
                      <MDBCardText className='text-start'>
                        {excerpt(description, 40)}
                      </MDBCardText>
                      <ButtonContainer>
                        <MDBBtn
                          size='sm'
                          rounded
                          color='info'
                          onClick={() => navigate(`/tour/${id}`)}
                        >
                          Read more
                        </MDBBtn>
                      </ButtonContainer>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  padding: 120px;
  max-width: 900px;
  align-content: center;
`;

const Hr = styled.hr`
  max-width: 570px;
`;

const ButtonContainer = styled.div`
  float: left;
  margin-top: -10px;
`;

export default TagTours;
