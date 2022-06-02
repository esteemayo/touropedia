import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Container>
      <h5>Redirecting you in {count} seconds</h5>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 100px;
  text-align: center;
`;

export default LoadingToRedirect;
