import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import DvrIcon from '@mui/icons-material/Dvr';

function BottomNavbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className='fixed-bottom ' elevation={3}>
      <BottomNavigation 
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} to="map" label="Map" icon={<MapIcon />} />
        <BottomNavigationAction component={Link} to="offers" label="Offers" icon={<DvrIcon />} />
      </BottomNavigation>
    </Box>
  )
}

export default BottomNavbar