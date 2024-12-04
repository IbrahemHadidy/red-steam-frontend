import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import useResponsiveViewport from '@hooks/useResponsiveViewport';

const InputField = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
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
        width={80}
        sx={{ fontSize: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
    </Box>
    <Skeleton
      variant="rounded"
      height={40}
      sx={{
        marginTop: '5px',
        padding: '10px',
        fontSize: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
    />
  </Box>
);

export default function LoadingSkeleton() {
  const isViewport960OrLess = useResponsiveViewport(960);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
          transform: 'translateX(2px)',
          paddingTop: '20px',
          width: isViewport960OrLess ? 'calc(100% - 30px)' : '950px',
        }}
      >
        <Skeleton
          variant="text"
          width={250}
          sx={{
            fontSize: '30px',
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
          <InputField />
          <InputField />
        </Box>

        <Skeleton
          variant="rounded"
          height={30}
          width={270}
          sx={{
            padding: '10px',
            fontSize: '14px',
            marginTop: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
          transform: 'translateX(2px)',
          paddingTop: '20px',
          width: isViewport960OrLess ? 'calc(100% - 30px)' : '950px',
        }}
      >
        <Skeleton
          variant="rectangular"
          height={1}
          sx={{
            width: isViewport960OrLess ? 'auto' : '950px',
            marginTop: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Skeleton
          variant="text"
          width={250}
          sx={{
            marginTop: '10px',
            fontSize: '30px',
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: isViewport960OrLess ? 'column' : 'row',
            marginTop: '35px',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            <Skeleton
              variant="text"
              width={130}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={200}
              height={35}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Skeleton
              variant="text"
              width={130}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={200}
              height={35}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignSelf: isViewport960OrLess ? 'flex-start' : 'flex-end',
              flexDirection: 'row',
              gap: '10px',
              marginTop: isViewport960OrLess ? '10px' : '0px',
            }}
          >
            <Skeleton
              variant="text"
              width={110}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={55}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: '100%', margin: '20px 0' }}>
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            height={51.5}
            sx={{
              width: isViewport960OrLess ? 'auto' : '950px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            gap: '10px',
          }}
        >
          <Skeleton
            variant="rectangular"
            width={80}
            height={35}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="text"
            width={50}
            sx={{
              fontSize: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            width={55}
            height={30}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="text"
            width={40}
            sx={{
              fontSize: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={35}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Box>
      </Box>
    </>
  );
}
