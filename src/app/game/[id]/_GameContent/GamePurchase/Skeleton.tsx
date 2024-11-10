import { Box, Skeleton } from '@mui/material';

export default function LoadingSkeleton() {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'rgba(226, 244, 255, 0.3)',
        borderRadius: '4px',
        padding: '16px',
        paddingBottom: '26px',
        marginBottom: '0px',
        zIndex: '1',
      }}
    >
      <Skeleton
        variant="rectangular"
        height={20}
        width={20}
        sx={{ float: 'right', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="text"
        width={300}
        sx={{ fontSize: '21px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
    </Box>
  );
}
