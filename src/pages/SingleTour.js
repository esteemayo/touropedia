import { useEffect } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBTooltip,
} from 'mdb-react-ui-kit';

import RelatedTours from 'components/RelatedTours';
import DisqusThread from 'components/DisqusThread';
import { fetchRelatedTours, fetchTour } from 'features/tour/tourSlice';
import {
  createView,
  fetchHistoriesOnTour,
} from 'features/history/historySlice';
import {
  createNewBookmark,
  fetchOneBookmark,
  removeBookmark,
} from 'features/bookmark/bookmarkSlice';

const SingleTour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { bookmark } = useSelector((state) => ({ ...state.bookmark }));
  const { views, error } = useSelector((state) => ({ ...state.history }));
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));

  const tags = tour?.tags;

  const handleSetAsBookmark = (tour) => {
    user && dispatch(createNewBookmark({ tour, toast }));
  };

  const handleUnSetAsBookmark = () => {
    const bookmarkId = bookmark?._id;
    user && dispatch(removeBookmark({ bookmarkId, toast }));
  };

  useEffect(() => {
    tags && dispatch(fetchRelatedTours(tags));
  }, [dispatch, tags]);

  useEffect(() => {
    id && dispatch(fetchHistoriesOnTour(id));
  }, [dispatch, id]);

  useEffect(() => {
    user && dispatch(createView({ tour: id }));
  }, [dispatch, user, id]);

  useEffect(() => {
    id && dispatch(fetchTour(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchOneBookmark(id));
  }, [dispatch, id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
          <MDBCardImage
            position='top'
            style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
            src={tour.image}
            alt={tour.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag='a'
              color='none'
              style={{ float: 'left', color: '#000' }}
              onClick={() => navigate('/')}
            >
              <MDBIcon
                fas
                size='lg'
                icon='long-arrow-alt-left'
                style={{ float: 'left' }}
              />
            </MDBBtn>
            <TourTitle>{tour.title}</TourTitle>
            <span>
              <p className='text-start tour-name'>Created By: {tour.name}</p>
            </span>
            <div style={{ float: 'left' }}>
              <span className='text-start'>
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className='text-start mt-2'>
              <MDBIcon
                style={{ float: 'left', margin: '5px' }}
                far
                icon='calendar-alt'
                size='lg'
              />
              <small className='text-muted'>
                <Moment fromNow>{tour.createdAt}</Moment> -{' '}
                <span>
                  <strong>
                    {views && views.length}{' '}
                    {views && views.length > 1 ? 'views' : 'view'}
                  </strong>
                </span>
              </small>
              <Wrapper>
                {user && !bookmark && (
                  <MDBTooltip tag='a' title='Bookmark'>
                    <MDBIcon
                      far
                      size='lg'
                      icon='bookmark'
                      color='primary'
                      onClick={() => handleSetAsBookmark(tour?._id)}
                    />
                  </MDBTooltip>
                )}
                {user && bookmark && (
                  <MDBTooltip tag='a' title='Unbookmark'>
                    <MDBIcon
                      fas
                      size='lg'
                      icon='bookmark'
                      color='primary'
                      onClick={handleUnSetAsBookmark}
                    />
                  </MDBTooltip>
                )}
              </Wrapper>
            </MDBCardText>
            <MDBCardText className='lead mb-0 text-start'>
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          {/* Related tours */}
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`tour/${id}`} />
      </MDBContainer>
    </>
  );
};

const TourTitle = styled.h3`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  width: 10px;
`;

export default SingleTour;
