// CustomLink.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  hoverColor?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  children,
  hoverColor,
}) => {
  return (
    <Link
      color='inherit'
      noWrap
      variant='body2'
      component={NavLink}
      to={to}
      sx={{
        flexShrink: 0,
        border: 0,
        mr: 5,
        width: 'auto',
        textDecoration: 'none',
        ':hover': {
          color: hoverColor || '#5FF531',
        },
      }}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
