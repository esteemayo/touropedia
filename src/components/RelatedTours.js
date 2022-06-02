import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import { excerpt } from 'utils';

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <Header>Related Tours</Header>}
          <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item) => {
                return (
                  <MDBCol>
                    <MDBCard key={item._id}>
                      <Link to={`/tour/${item._id}`}>
                        <MDBCardImage
                          src={item.image}
                          alt={item.title}
                          style={{ height: '250px', objectFit: 'cover' }}
                          position='top'
                        />
                      </Link>
                      <span className='text-start tag-card'>
                        {item.tags.map((tag) => {
                          return (
                            <>
                              <Link to={`/tours/tag/${tag}`} key={tag}>
                                #{tag}
                              </Link>{' '}
                            </>
                          );
                        })}
                      </span>
                      <MDBCardBody>
                        <MDBCardTitle className='text-start'>
                          {item.title}
                        </MDBCardTitle>
                        <MDBCardText className='text-start'>
                          {excerpt(item.description, 45)}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                );
              })}
          </MDBRow>
        </>
      )}
    </>
  );
};

const Header = styled.h4`
  overflow: hidden;
  text-align: center;

  &::before,
  &::after {
    background-color: #000;
    content: '';
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  &::before {
    right: 0.5em;
    margin-left: -50%;
  }

  &::after {
    left: 0.5em;
    margin-right: -50%;
  }
`;

export default RelatedTours;
