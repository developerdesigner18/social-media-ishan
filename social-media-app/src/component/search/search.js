import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './search.css'
import SearchPeople from './people/searchPeople';
import { TextField } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='search-main-container'>
        <Box sx={{ width: '100%', textAlign: 'left',paddingRight:'20px' }}>
          <TextField label='search' size='small' fullWidth></TextField>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="People" {...a11yProps(0)} />
              <Tab label="Groups" {...a11yProps(1)} />
              <Tab label="Marketplace" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <SearchPeople/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Groups
          </TabPanel>
          <TabPanel value={value} index={2}>
            Marketplace
          </TabPanel>
        </Box>
        <Box style={{border:'1px solid black',width:'40%'}}>hello</Box>
      </div>
    </>
  );
}
