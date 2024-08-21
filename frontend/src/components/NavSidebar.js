import { useContext, useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from './navigation/useDimensions';
import { NavToggle } from './navigation/NavToggle';
import { Navigation } from './navigation/Navigation';
import API from '../api';
import Cookies from 'js-cookie';

import '../css/navigation.css';
import { UserContext } from '../App';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    height: '100vh',
    transition: {
      type: 'spring',
      stiffness: 40,
      restDelta: 4,
    },
  }),
  closed: {
    clipPath: 'circle(25px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
    transitionEnd: {
      height: '75px',
    },
  },
};

const variants2 = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.8,
    },
  },
  closed: {
    opacity: 0,
  },
};

export const NavSidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    const token = Cookies.get('token');
    API.post(`api/auth/logout/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
        Cookies.remove('token');
        Cookies.remove('refresh_token');
        localStorage.removeItem('user');
        userContext.setUser(null);
        toggleOpen();
      })
      .catch((error) => {
        console.error('logout error: ', error);
      });
  };

  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
      <motion.div className='background' variants={sidebar} />
      <Navigation />
      <motion.div variants={variants2} className={`nav-bottom`}>
        <button onClick={handleLogout}>Logout</button>
      </motion.div>
      <NavToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
