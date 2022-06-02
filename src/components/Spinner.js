import styled from 'styled-components';
import { MDBSpinner } from 'mdb-react-ui-kit';

const Spinner = () => {
  return (
    <Container>
      <MDBSpinner
        className='me-2'
        style={{ width: '3rem', height: '3rem', marginTop: '100px' }}
      >
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

export default Spinner;
