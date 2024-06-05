import React from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';

export default function Slidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className=' w-full bg-[#343a40] h-[671px]'>
        <div className='p-[20px]'>
          <Link to={'/'}>
            <h1 className='text-[#c2c7d0] text-[16px] ms-[13px]'>DashBoard</h1>
          </Link>
          <List
            sx={{ width: '100%', maxWidth: 360, color: '#c2c7d0' }}
            component="nav"
            aria-labelledby="nested-list-subheader"

          >
            <ListItemButton onClick={handleClick}>

              <ListItemText primary="Book" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to={'/addcon'}>
                    <ListItemText primary="Add" />
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to={'/viewcon'}>
                    <ListItemText primary="view" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </div>
      </div>
    </>
  )
}
