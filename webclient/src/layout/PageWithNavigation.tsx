import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PageWithNavigation() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PageWithNavigation;
