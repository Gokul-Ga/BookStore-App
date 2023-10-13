import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const footerStyle = {
  backgroundColor: 'black',
  color: 'white',
  
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: 100, 
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container maxWidth="xxl" sx={{ height: '100px',mt:'20%' }}>
        <Typography variant="h6" align="center">
          Book Store App
        </Typography>
        <Typography variant="body2" align="center">
          Contact: 1234567890
        </Typography>
        <Typography variant="body2" align="center">
          Email: bookstore@gmail.com
        </Typography>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Book Store App
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;















// import React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

// const Footer = () => {
//   return (
//     <footer>
//       <Container maxWidth="xxl"  sx={{backgroundColor:'black',height:'100px',marginTop:'10%' }}>
//         <Typography color={'white'}  variant="h6" align="center">
//           Book Store App
//         </Typography>
//         <Typography  color={'white'} variant="body2" align="center">
//           Contact: 1234567890
//         </Typography>
//         <Typography  color={'white'} variant="body2" align="center">
//           Email : bookstore@gmail.com
//         </Typography>
//         <Typography  color={'white'} variant="body2" align="center">
//           &copy; {new Date().getFullYear()} Book Store App
//         </Typography>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;



