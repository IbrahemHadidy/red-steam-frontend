import useResponsiveViewport from '@hooks/useResponsiveViewport';
import { Box, Skeleton } from '@mui/material';

export default function LoadingSkeleton() {
  const isViewport960 = useResponsiveViewport(960);

  return !isViewport960 ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        margin: '0 auto',
      }}
      width={940}
      height={66}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '28px',
          width: 'inherit',
          background: 'rgba(62, 103, 150, 0.919)',
          zIndex: '60',
        }}
        height={34}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            top: '28px',
            zIndex: '60',
          }}
        >
          <Skeleton
            variant="rectangular"
            width={20}
            height={20}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginLeft: '6px' }}
          />
          <Skeleton
            variant="text"
            width={65}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              marginLeft: '6px',
            }}
          />
          <Skeleton
            variant="text"
            width={110}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              marginLeft: '20px',
            }}
          />
          <Skeleton
            variant="text"
            width={70}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              marginLeft: '20px',
            }}
          />
          <Skeleton
            variant="text"
            width={70}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              marginLeft: '20px',
            }}
          />
          <Skeleton
            variant="text"
            width={40}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              marginLeft: '20px',
            }}
          />
          <Skeleton
            variant="text"
            width={40}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              marginLeft: '20px',
            }}
          />
        </Box>

        <Box
          width={200}
          height={27}
          sx={{
            borderRadius: '5px',
            marginRight: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Skeleton
            variant="rounded"
            width={25}
            height={25}
            sx={{ float: 'right', margin: '1px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        background: 'rgba(62, 103, 150, 0.919)',
        marginTop: '60px',
        paddingBottom: '1px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'stretch',
          alignItems: 'stretch',
          width: '100%',
          position: 'relative',
          zIndex: '60',
          marginLeft: '15px',
        }}
      >
        <Skeleton
          variant="text"
          width={65}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '15px',
          }}
        />
        <Skeleton
          variant="text"
          width={110}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '15px',
          }}
        />
        <Skeleton
          variant="text"
          width={70}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '15px',
          }}
        />
        <Skeleton
          variant="text"
          width={70}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '15px',
          }}
        />
        <Skeleton
          variant="text"
          width={40}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '15px',
          }}
        />
        <Skeleton
          variant="text"
          width={40}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontSize: '15px',
            marginBottom: '8px',
          }}
        />
      </Box>
      <Box
        height={27}
        sx={{
          borderRadius: '5px',
          margin: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Skeleton
          variant="rounded"
          width={25}
          height={25}
          sx={{ float: 'right', margin: '1px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
        />
      </Box>
    </Box>
  );
}
