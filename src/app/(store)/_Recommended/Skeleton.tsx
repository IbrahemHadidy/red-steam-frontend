import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import type { JSX } from 'react';

const Item = () => {
  return (
    <Skeleton
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
      variant="rectangular"
      width={229}
      height={134}
    />
  );
};

export default function LoadingSkeleton(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        transform: 'translateX(2px)',
        width: '940px',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingTop: '20px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton
          variant="text"
          width={370}
          sx={{
            fontSize: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '10px',
          }}
        />
        <Skeleton
          variant="text"
          width={170}
          sx={{
            fontSize: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '10px',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
        }}
      >
        <Item />
        <Item />
        <Item />
        <Item />
      </Box>
    </Box>
  );
}
