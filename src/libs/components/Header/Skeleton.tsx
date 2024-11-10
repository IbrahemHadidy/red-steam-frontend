import useResponsiveViewport from '@hooks/useResponsiveViewport';
import { Box, Skeleton } from '@mui/material';

export function HeaderUserSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        margin: '0',
        top: '5px',
        right: '0',
        zIndex: '500',
        gap: '7px',
      }}
    >
      <Skeleton
        variant="rectangular"
        width={116}
        height={25}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="rectangular"
        width={38}
        height={25}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="rectangular"
        width={50}
        height={25}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <Skeleton
        variant="rectangular"
        width={35}
        height={36}
        sx={{ marginTop: '-5px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
    </Box>
  );
}

function MainSkeleton() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'space-between',
          paddingLeft: '14px',
          marginRight: '30px',
        }}
      >
        <Skeleton
          variant="circular"
          width={46}
          height={46}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Skeleton
          variant="text"
          width={90}
          sx={{ fontSize: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '15px',
          flexBasis: 'auto',
          flexGrow: '1',
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant="text"
          width={80}
          sx={{ fontSize: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Skeleton
          variant="text"
          width={80}
          sx={{ fontSize: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Skeleton
          variant="text"
          width={80}
          sx={{ fontSize: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Skeleton
          variant="text"
          width={120}
          sx={{ fontSize: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
      </Box>
    </>
  );
}

export default function LoadingSkeleton() {
  const isViewport960 = useResponsiveViewport(960);

  return !isViewport960 ? (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#171d25',
        padding: '2px 0 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '940px',
          maxWidth: '940px',
          height: '104px',
          margin: '0 auto',
          zIndex: '402',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <HeaderUserSkeleton />
        <MainSkeleton />
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#171a21',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        alignItems: 'center',
        zIndex: '900',
        overflow: 'hidden',
        padding: '13px 8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
        }}
      >
        <Skeleton
          variant="circular"
          width={35}
          height={35}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
        <Skeleton
          variant="text"
          width={70}
          sx={{ fontSize: '10px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        width={36}
        height={31}
        sx={{
          position: 'absolute',
          top: '9px',
          left: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />
    </Box>
  );
}
