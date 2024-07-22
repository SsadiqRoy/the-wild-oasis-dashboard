import styled from 'styled-components';
import { useCurrentUser } from '../features/authentication/authHooks';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: var(--color-grey-50);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function Protect({ children }) {
  const { isAuthenticated, isGettingUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) navigate('/login', { replace: true });
  }, [isAuthenticated, isGettingUser, navigate]);

  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // if (!isAuthenticated) return navigate('/login', { replace: true }); NOTE: DO NOT USE useNavigate ON TOP LEVEL CODE

  if (isAuthenticated) return children;
}

export default Protect;
