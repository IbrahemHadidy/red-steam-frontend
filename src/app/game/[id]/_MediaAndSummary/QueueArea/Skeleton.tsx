import useResponsiveViewport from '@hooks/useResponsiveViewport';
import { Box, Skeleton } from '@mui/material';

function Content() {
  return (
    <>
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
          }}
        >
          <Skeleton
            variant="rounded"
            width={180}
            height={30}
            sx={{
              background: 'rgba(103, 193, 245, 0.2)',
            }}
          />
          <Skeleton
            variant="rounded"
            width={85}
            height={30}
            sx={{
              background: 'rgba(103, 193, 245, 0.2)',
            }}
          />
          <Skeleton
            variant="rounded"
            width={85}
            height={30}
            sx={{
              background: 'rgba(103, 193, 245, 0.2)',
            }}
          />
        </Box>
        <Skeleton
          variant="rounded"
          width={180}
          height={30}
          sx={{
            background: 'rgba(103, 193, 245, 0.2)',
          }}
        />
      </Box>
    </>
  );
}

export default function LoadingSkeleton() {
  const isViewport960 = useResponsiveViewport(960);
  return !isViewport960 ? (
    <>
      <Box
        sx={{
          background: 'rgba(0, 0, 0, 0.2)',
          margin: '0px auto',
          marginBottom: '16px',
        }}
        width={940}
      >
        <Content />
      </Box>
    </>
  ) : (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.2)',
        margin: '0px auto',
        marginBottom: '16px',
        width: 'auto',
      }}
    >
      <Content />
    </Box>
  );
}
