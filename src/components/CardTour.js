import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from 'mdb-react-ui-kit';

import { excerpt } from 'utils';
import { likeTour } from 'features/tour/tourSlice';

const CardTour = ({
  _id: id,
  tags,
  name,
  likes,
  title,
  image,
  description,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const userId = user?.id || user?.user?._id || user?.googleId;

  const handleLike = () => {
    dispatch(likeTour({ id }));
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon='thumbs-up' />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag='a'
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? 's' : ''}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon='thumbs-up' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <MDBIcon far icon='thumbs-up' />
        &nbsp; Like
      </>
    );
  };

  return (
    <MDBCardGroup>
      <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
        <MDBCardImage
          src={image}
          alt={title}
          position='top'
          style={{ maxWidth: '100%', height: '180px' }}
        />
        <div className='top-left'>{name}</div>
        <span className='text-start tag-card'>
          {tags.map((tag, index) => (
            <Link key={index} to={`/tours/tag/${tag}`}>
              #{tag}{' '}
            </Link>
          ))}
          <MDBBtn
            style={{ float: 'right' }}
            tag='a'
            color='none'
            onClick={!user ? null : handleLike}
          >
            {!user ? (
              <MDBTooltip title='Please login to like tour' tag='a'>
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
          <MDBCardText className='text-start'>
            {excerpt(description, 45)}
            <Link to={`/tour/${id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
