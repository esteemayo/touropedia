import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';

import app from '../firebase';
import { registerUser } from 'features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const firstNameRef = useRef();
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileName = `${new Date().getTime()}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `users/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const { firstName, lastName, email, password, passwordConfirm } =
            values;

          const credentials = {
            ...values,
            avatar: downloadURL,
          };

          if (password !== passwordConfirm) {
            return toast.error('Passwords do not match');
          }

          if (firstName && lastName && email && password && passwordConfirm) {
            dispatch(registerUser({ credentials, navigate, toast }));
          }
        });
      }
    );
  };

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-6'>
              <MDBInput
                label='First Name'
                type='text'
                name='firstName'
                onChange={handleChange}
                inputRef={firstNameRef}
                required
                invalid='true'
                validation='Please provide first name'
              />
            </div>
            <div className='col-md-6'>
              <MDBInput
                label='Last Name'
                type='text'
                name='lastName'
                onChange={handleChange}
                required
                invalid='true'
                validation='Please provide last name'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='Email'
                type='email'
                name='email'
                onChange={handleChange}
                required
                invalid='true'
                validation='Please provide email'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='Password'
                type='password'
                name='password'
                onChange={handleChange}
                required
                invalid='true'
                validation='Please provide password'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='Confirm Password'
                type='password'
                name='passwordConfirm'
                onChange={handleChange}
                required
                invalid='true'
                validation='Please confirm password'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className='col-12'>
              <MDBBtn className='mt-2 btn-register'>
                {loading && (
                  <MDBSpinner
                    size='sm'
                    role='status'
                    tag='span'
                    className='mt-2'
                  />
                )}{' '}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p>Already have an account? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  padding: 15px;
  max-width: 450px;
  align-content: center;
  margin-top: 120px;

  .btn-register {
    width: 100%;
  }
`;

export default Register;
