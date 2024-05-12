import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom'; // 추가

interface MenuItem {
  title: string;
  path: string;
}

interface IconButtonWithMenuProps {
  icon: JSX.Element;
  menuItems: MenuItem[];
}

export default function IconButtonWithMenu({
  icon,
  menuItems,
}: IconButtonWithMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        aria-label='menu'
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button-label',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          style: {
            marginLeft: '-28px',
          },
        }}
      >
        {menuItems.map((menuItem, index) => (
          <MenuItem key={index} onClick={handleClose} sx={{ fontSize: '14px' }}>
            <Link
              to={menuItem.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {menuItem.title}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
