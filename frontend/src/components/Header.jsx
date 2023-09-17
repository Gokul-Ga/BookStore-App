import React, { useState, useEffect } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import logo from "../components/assets/logo.png"
const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {

    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/login':
        setValue(1);
        break;
      case '/signup':
        setValue(2);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  return (
    <AppBar sx={{ bgcolor: '#0b1526' }}>
      <Toolbar>
        <Box width={'5%'}>
          <img src={logo} LinkComponent={Link} Link to='/' alt="" width={150} />

        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Tabs
            textColor='inherit'
            indicatorColor='primary'
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to='/' label='Home' />
            <Tab LinkComponent={Link} to='/login' label='Login' />
            <Tab LinkComponent={Link} to='/signup' label='Signup' />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;






















// import React, { useState } from 'react'
// import { AppBar, Box, Tab, Tabs, TextField, Toolbar } from '@mui/material'
// import MovieIcon from '@mui/icons-material/Movie';
// import { Link } from 'react-router-dom';
// import { BookOnlineSharp, LibraryBooks } from '@mui/icons-material';

// const Header = () => {
//     const [value, setValue] = useState(0);

//     return (
//         <AppBar sx={{ bgcolor: '#2b2d42' }}>
//             <Toolbar>
//                 <Box width={'20%'}>
//                     <LibraryBooks />
//                 </Box>
//                 <Box sx={{ marginLeft: 'auto' }}>
//                     <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e, val) => setValue(val)}>
//                         {/* <Tab LinkComponent={Link} to='/' label='Home' /> */}
//                         <Tab LinkComponent={Link} to='/login' label='Login' />
//                         <Tab LinkComponent={Link} to='/signup' label='Signup' />
//                     </Tabs>

//                 </Box>
//             </Toolbar>
//         </AppBar>
//     )
// }

// export default Header
