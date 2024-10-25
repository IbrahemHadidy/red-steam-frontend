import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import type { JSX } from 'react';

const InputField = ({ type }: { type: 'input' | 'textarea' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton
        variant="text"
        width={170}
        sx={{ fontSize: '14px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="text"
        width={120}
        sx={{ fontSize: '16px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
    </Box>
    {type === 'input' && (
      <Skeleton
        variant="rounded"
        height={40}
        sx={{
          padding: '10px',
          fontSize: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />
    )}
    {type === 'textarea' && (
      <Skeleton
        variant="rounded"
        height={140}
        sx={{
          padding: '10px',
          fontSize: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />
    )}
  </Box>
);

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
      width={950}
    >
      <Skeleton
        variant="text"
        width={250}
        sx={{ fontSize: '25px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <InputField type="input" />
        <InputField type="input" />
        <InputField type="input" />
        <InputField type="textarea" />
        <InputField type="input" />
      </Box>
    </Box>
  );
}
