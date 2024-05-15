
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

interface BadgeProps {
  badgeContent?: number;
  children: JSX.Element;
}

export default function BadgeComponent({ badgeContent, children }: BadgeProps) {
  if (!badgeContent) {
    // badgeContent가 없을 때는 Badge 없이 children만 렌더링
    return (
      <IconButton
        sx={{
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        {children}
      </IconButton>
    );
  }
  
  return (
    <Badge
      badgeContent={badgeContent}
      color='secondary'
      sx={{
        '& .MuiBadge-badge': {
          fontSize: 9,
          height: 15,
          minWidth: 10,
          right: 8,
          top: 11,
          padding: '0 4px',
          border: '2px solid white',
        },
      }}
    >
      <IconButton
        sx={{
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        {children}
      </IconButton>
    </Badge>
  );
}
