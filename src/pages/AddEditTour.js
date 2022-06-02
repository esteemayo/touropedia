import styled from 'styled-components';
import { toast } from 'react-toastify';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
  MDBValidation,
} from 'mdb-react-ui-kit';

import { createNewTour, updTour } from 'features/tour/tourSlice';

const AddEditTour = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userTours, error, loading } = useSelector((state) => ({
    ...state.tour,
  }));

  const titleRef = useRef();
  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    tags: [],
  });

  const [tagErrorMsg, setTagErrorMsg] = useState(null);
  const [titleErrorMsg, setTitleErrorMsg] = useState(null);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState(null);

  const { tags, title, description } = tourData;

  const handleChange = ({ target: input }) => {
    setTitleErrorMsg(null);
    setDescriptionErrorMsg(null);

    const { name, value } = input;
    setTourData({ ...tourData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrorMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setTourData({ title: '', description: '', tags: [] });
  };

  const validateForm = () => {
    if (!title) {
      setTitleErrorMsg('Please provide title');
    }

    if (!description) {
      setDescriptionErrorMsg('Please provide description');
    }

    if (!tags.length) {
      setTagErrorMsg('Please provide some tags');
    }

    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm();

    if (title && description && tags) {
      if (!id) {
        dispatch(createNewTour({ tourData, navigate, toast }));
      } else {
        dispatch(updTour({ id, tourData, navigate, toast }));
      }
      handleClear();
    }
  };

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const tour = userTours.find((item) => item._id === id);
      setTourData({ ...tour });
    }
  }, [id, userTours]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container className='container'>
      <MDBCard alignment='center'>
        <h5>{id ? 'Update Tour' : 'Add Tour'}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
            <div className='col-md-12'>
              <MDBInput
                type='text'
                name='title'
                placeholder='Title'
                className='form-control'
                required
                invalid='true'
                value={title || ''}
                onChange={handleChange}
                inputRef={titleRef}
              />
              {titleErrorMsg && <ErrorMessage>{titleErrorMsg}</ErrorMessage>}
            </div>
            <div className='col-md-12'>
              <MDBInput
                type='text'
                name='description'
                placeholder='Description'
                className='form-control'
                required
                invalid='true'
                textarea='true'
                rows={4}
                value={description || ''}
                onChange={handleChange}
              />
              {descriptionErrorMsg && (
                <ErrorMessage>{descriptionErrorMsg}</ErrorMessage>
              )}
            </div>
            <div className='col-md-12'>
              <ChipInput
                name='tags'
                variant='outlined'
                placeholder='Tag'
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrorMsg && <ErrorMessage>{tagErrorMsg}</ErrorMessage>}
            </div>
            <div className='d-flex justify-content-start'>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, image: base64 })
                }
              />
            </div>
            <div className='col-12'>
              <MDBBtn style={{ width: '100%' }}>
                {loading && (
                  <MDBSpinner
                    size='sm'
                    role='status'
                    tag='span'
                    className='mt-2'
                  />
                )}{' '}
                {id ? 'Update' : 'Submit'}
              </MDBBtn>
              <MDBBtn
                style={{ width: '100%' }}
                className='mt-2'
                color='danger'
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </Container>
  );
};

const Container = styled.div`
  // margin-top: calc(100px - 0.5rem);
  margin: auto;
  padding: 15px;
  max-width: 450px;
  align-content: center;
  margin-top: 120px;
`;

const ErrorMessage = styled.div`
  color: #f93154;
  margin-top: 5px;
  text-align: left;
  font-size: 14px;
`;

export default AddEditTour;
