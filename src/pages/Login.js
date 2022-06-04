import styled from 'styled-components';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

import { loginUser, googleSignIn } from 'features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const emailRef = useRef();
  const [values, setValues] = useState(null);

  const devEnv = process.env.NODE_ENV !== 'production';

  const clientId = devEnv
    ? '616492793975-52omlu9jh277tpjhl4vignn3nu60s1cf.apps.googleusercontent.com'
    : '616492793975-sjamp4vprbdf49abc192bc3a2a90vf5b.apps.googleusercontent.com';

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values) {
      dispatch(loginUser({ values, navigate, toast }));
    }
  };

  const googleSuccess = (response) => {
    const email = response?.profileObj?.email;
    const name = response?.profileObj?.name;
    const token = response?.tokenId;
    const googleId = response?.googleId;
    const result = { email, name, token, googleId };

    dispatch(googleSignIn({ result, navigate, toast }));
  };

  const googleFailure = (error) => {
    toast.error(error);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-12'>
              <MDBInput
                label='Email'
                type='email'
                name='email'
                onChange={handleChange}
                inputRef={emailRef}
                required
                invalid='true'
                validation='Please provide your email'
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
                validation='Please provide your password'
              />
            </div>
            <div className='col-12'>
              <MDBBtn className='mt-2 btn-login'>
                {loading && (
                  <MDBSpinner
                    size='sm'
                    role='status'
                    tag='span'
                    className='mt-2'
                  />
                )}{' '}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <MDBBtn
                style={{ width: '100%' }}
                color='danger'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className='me-2' fab icon='google' /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/register'>
            <p>Don't have an account? Sign Up</p>
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

  .btn-login {
    width: 100%;
  }
`;

export default Login;
