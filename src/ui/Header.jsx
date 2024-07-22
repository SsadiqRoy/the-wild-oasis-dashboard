import { HiArrowRightOnRectangle, HiOutlineUser } from 'react-icons/hi2';
import styled from 'styled-components';
import { useLogout } from '../features/authentication/authHooks';
import ButtonIcon from './ButtonIcon';
import UserAvatar from '../features/authentication/UserAvatar';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function Header() {
  const { logout, isLogingOut } = useLogout();
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <UserAvatar />

      <StyledHeaderMenu>
        <li>
          <ButtonIcon onClick={() => navigate('/account')}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon disabled={isLogingOut} onClick={logout}>
            <HiArrowRightOnRectangle />
          </ButtonIcon>
        </li>
      </StyledHeaderMenu>
    </StyledHeader>
  );
}

export default Header;
