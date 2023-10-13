import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './assets/logo.png';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem('userRole');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
    fontFamily: 'Arial',
  };

  const activeLinkStyle = {
    color: 'orange',
    textDecoration: 'line',
    fontWeight:'bold'
  };

  const drawerContent = (
    <div>
      <List>
        {userRole === 'user' ? (
          <>
            <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/profile"
              selected={location.pathname === '/profile'}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/mybooks"
              selected={location.pathname === '/mybooks'}
            >
              <ListItemText primary="My Books" />
            </ListItem>
            <ListItem button onClick={handleLogout} style={{fontFamily: 'Arial'}}>
              <ListItemText primary="Logout"  />
            </ListItem>
          </>
        ) : userRole === 'admin' ? (
          <>
            <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/addbook"
              selected={location.pathname === '/addbook'}
            >
              <ListItemText primary="Add Book" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/allbooks"
              selected={location.pathname === '/allbooks'}
            >
              <ListItemText primary="View Books" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/viewrentals"
              selected={location.pathname === '/viewrentals'}
            >
              <ListItemText primary="View Rentals" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/viewusers"
              selected={location.pathname === '/viewusers'}
            >
              <ListItemText primary="View Users" />
            </ListItem>
            <ListItem button onClick={handleLogout} style={{fontFamily: 'Arial'}}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/login"
              selected={location.pathname === '/login'}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/signup"
              selected={location.pathname === '/signup'}
            >
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: '#380463' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, marginTop: '8px' }}>
            <img src={logo} alt="" width={130} />
          </Typography>
          <Box>
            <Hidden lgDown>
              
              {userRole === 'user' ? (
                <>
                  <Link
                    to="/"
                    style={{ 
                      ...linkStyle,
                      ...(location.pathname === '/' ? activeLinkStyle : {}),
                    }}
                  >
                    HOME
                  </Link>
                  <Link
                    to="/profile"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/profile' ? activeLinkStyle : {}),
                    }}
                  >
                    PROFILE
                  </Link>
                  <Link
                    to="/mybooks"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/mybooks' ? activeLinkStyle : {}),
                    }}
                  >
                    MY BOOKS
                  </Link>
                  <Button color="inherit" onClick={handleLogout}>
                    LOGOUT
                  </Button>
                </>
              ) : userRole === 'admin' ? (
                <>
                  <Link
                    to="/"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/' ? activeLinkStyle : {}),
                    }}
                  >
                    HOME
                  </Link>
                  <Link
                    to="/addbook"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/addbook' ? activeLinkStyle : {}),
                    }}
                  >
                    ADD BOOK
                  </Link>
                  <Link
                    to="/allbooks"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/allbooks' ? activeLinkStyle : {}),
                    }}
                  >
                    VIEW BOOKS
                  </Link>
                  <Link
                    to="/viewrentals"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/viewrentals' ? activeLinkStyle : {}),
                    }}
                  >
                    ViIEW RENTALS
                  </Link>
                  <Link
                    to="/viewusers"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/viewusers' ? activeLinkStyle : {}),
                    }}
                  >
                    VIEW USERS
                  </Link>
                  <Button color="inherit" onClick={handleLogout}>
                    LOGOUT
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/' ? activeLinkStyle : {}),
                    }}
                  >
                    HOME
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/login' ? activeLinkStyle : {}),
                    }}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/signup"
                    style={{
                      ...linkStyle,
                      ...(location.pathname === '/signup' ? activeLinkStyle : {}),
                    }}
                  >
                    SIGNUP
                  </Link>
                </>
              )}
            </Hidden>
            <Hidden lgUp>
              
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, 
                }}
              >
                {drawerContent}
              </Drawer>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
























