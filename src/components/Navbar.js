import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';

import { setLogout } from 'features/auth/authSlice';
import { searchTours } from 'features/tour/tourSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch('');
    } else {
      navigate('/');
    }
  };

  return (
    <MDBNavbar
      fixed='top'
      expand='lg'
      style={{ backgroundColor: `${isScrolled ? '#d1cdcf' : '#f0e6ea'}` }}
    >
      <MDBContainer>
        <MDBNavbarBrand
          href='/'
          style={{
            color: `${isScrolled ? '#fff' : '#606080'}`,
            fontWeight: '600',
            fontSize: '22px',
          }}
        >
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShow(!show)}
          style={{ color: '#606080' }}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {user && (
              <UserName style={{ color: `${isScrolled ? '#fff' : '#4f4f4f'}` }}>
                Logged in as: {user?.name || user?.user?.name}
              </UserName>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <p
                  className='header-text'
                  style={{ color: `${isScrolled ? '#fff' : '#606080'}` }}
                >
                  Home
                </p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/add-tour'>
                    <p
                      className='header-text'
                      style={{ color: `${isScrolled ? '#fff' : '#606080'}` }}
                    >
                      Add Tour
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/dashboard'>
                    <p
                      className='header-text'
                      style={{ color: `${isScrolled ? '#fff' : '#606080'}` }}
                    >
                      Dashboard
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user ? (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p
                    className='header-text'
                    style={{ color: `${isScrolled ? '#fff' : '#606080'}` }}
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p
                    className='header-text'
                    style={{ color: `${isScrolled ? '#fff' : '#606080'}` }}
                  >
                    Login
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <InputContainer>
              <input
                type='text'
                className='form-control'
                placeholder='Search Tour'
                style={{ border: 'none' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputContainer>
            <IconWrapper>
              <MDBIcon fas icon='search' style={{ marginLeft: '-20px' }} />
            </IconWrapper>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

const UserName = styled.h5`
  font-size: 19px;
  margin-right: 30px;
  margin-top: 27px;
`;

const IconWrapper = styled.div`
  margin-top: 5px;
  margin-left: 5px;
`;

const InputContainer = styled.div`
  background-color: #fff;
  width: 230px;
  height: 33.5px;
  border-radius: 2px;
`;

export default Navbar;
