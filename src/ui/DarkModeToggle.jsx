import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../features/context/DarkModeContext';

function DarkModeToggle() {
  const { darkMode, toggleTheme } = useDarkMode();

  return <ButtonIcon onClick={toggleTheme}>{darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>;
}

export default DarkModeToggle;
