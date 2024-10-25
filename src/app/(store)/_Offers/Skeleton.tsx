import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import type { JSX } from 'react';

export default function LoadingSkeleton(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        transform: 'translateX(2px)',
        paddingTop: '20px',
      }}
      width={940}
      height={470}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton
          variant="text"
          width={200}
          sx={{
            fontSize: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '10px',
          }}
        />
        <Skeleton
          variant="text"
          width={130}
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
          position: 'relative',
        }}
      >
        <Skeleton
          animation="pulse"
          variant="rectangular"
          height={388}
          width={306}
          sx={{ marginRight: '11px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Skeleton
          animation="pulse"
          variant="rectangular"
          height={388}
          width={306}
          sx={{ marginRight: '11px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Box height={388} width={306}>
          <Skeleton
            animation="pulse"
            variant="rectangular"
            height={186.5}
            width={306}
            sx={{ marginBottom: '15px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          />
          <Skeleton
            animation="pulse"
            variant="rectangular"
            height={186.5}
            width={306}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
