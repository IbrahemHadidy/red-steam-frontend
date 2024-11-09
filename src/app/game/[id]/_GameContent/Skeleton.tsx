import { Box, Skeleton } from '@mui/material';

export default function LoadingSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '16px',
        margin: '0 auto',
        transform: 'translateX(2px)',
        gap: '14px',
      }}
      width={940}
    >
      <Box sx={{ marginTop: '16px' }}>
        <Box
          width={616}
          height={93}
          sx={{
            paddingTop: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
          }}
        >
          <Skeleton
            variant="text"
            width={200}
            height={40}
            sx={{
              marginLeft: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <Skeleton
            variant="text"
            width={400}
            height={23}
            sx={{
              marginLeft: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        </Box>
        <Skeleton
          variant="text"
          width={300}
          height={30}
          sx={{
            marginTop: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={616}
          height={2}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={300}
          height={20}
          sx={{
            marginTop: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={500}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={600}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={200}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={616}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={270}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={600}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Skeleton
          variant="text"
          width={100}
          height={20}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </Box>
      <Box
        width={308}
        sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Box>
          <Box
            sx={{
              padding: '10px 18px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </Box>
          <Box
            sx={{
              padding: '10px 18px',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            <Skeleton
              variant="text"
              width={200}
              height={24}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="text"
              width={260}
              height={2}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="text"
              width={200}
              height={24}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </Box>
        </Box>
        <Box
          height={212}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Skeleton
              variant="rectangular"
              width={38}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={238}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Skeleton
              variant="rectangular"
              width={38}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={238}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Skeleton
              variant="rectangular"
              width={38}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={238}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Skeleton
              variant="rectangular"
              width={38}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={238}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Skeleton
              variant="rectangular"
              width={38}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Skeleton
              variant="rectangular"
              width={238}
              height={30}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width={276}
            height={45}
            sx={{
              marginTop: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
