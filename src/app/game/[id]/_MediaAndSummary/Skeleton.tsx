import { Box, Skeleton } from '@mui/material';

export default function LoadingSkeleton() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          transform: 'translateX(2px)',
          paddingTop: '20px',
        }}
        width={940}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Skeleton
              variant="text"
              width={250}
              sx={{
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Skeleton
              variant="text"
              width={320}
              sx={{
                marginTop: '-5px',
                fontSize: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
          </Box>
          <Skeleton
            variant="rounded"
            height={33}
            width={130}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              alignSelf: 'center',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)',
          }}
        >
          <Box width={600} height={438}>
            <Skeleton
              variant="rectangular"
              width={600}
              height={337.5}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Box
              width={600}
              height={69}
              sx={{ display: 'flex', flexDirection: 'row', gap: '5px', marginTop: '5px' }}
            >
              <Skeleton
                variant="rectangular"
                width={116}
                height={65}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rectangular"
                width={116}
                height={65}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rectangular"
                width={116}
                height={65}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rectangular"
                width={116}
                height={65}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rectangular"
                width={116}
                height={65}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
            <Box width={600} height={18} sx={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
              <Skeleton
                variant="rounded"
                width={38}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rounded"
                width={522}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rounded"
                width={38}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
          </Box>
          <Box width={324} height={429}>
            <Skeleton
              variant="rectangular"
              width={324}
              height={151}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Skeleton
              variant="text"
              height={18}
              width={300}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginTop: '7px' }}
            />
            <Skeleton
              variant="text"
              height={18}
              width={310}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Skeleton
              variant="text"
              height={18}
              width={285}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Skeleton
              variant="text"
              height={18}
              width={320}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Skeleton
              variant="text"
              height={18}
              width={250}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Box
              width={250}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '35px',
                marginTop: '10px',
              }}
            >
              <Skeleton
                variant="text"
                width={70}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="text"
                width={90}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
            <Box
              width={250}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '35px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              <Skeleton
                variant="text"
                width={70}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="text"
                width={90}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
            <Box
              width={250}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '35px',
              }}
            >
              <Skeleton
                variant="text"
                width={70}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="text"
                width={90}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
            <Box
              width={250}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '35px',
              }}
            >
              <Skeleton
                variant="text"
                width={70}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="text"
                width={90}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
            <Skeleton
              variant="text"
              width={250}
              height={18}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                marginTop: '10px',
              }}
            />
            <Box
              width={250}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2px',
              }}
            >
              <Skeleton
                variant="rounded"
                width={55}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rounded"
                width={55}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rounded"
                width={55}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rounded"
                width={55}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
              <Skeleton
                variant="rounded"
                width={18}
                height={18}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        width={940}
        height={58}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          transform: 'translateX(2px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Skeleton
            variant="rounded"
            width={155}
            height={30}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginLeft: '18px',
            }}
          />
          <Skeleton
            variant="rounded"
            width={90}
            height={30}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginLeft: '4px',
            }}
          />
          <Skeleton
            variant="rounded"
            width={90}
            height={30}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginLeft: '4px',
            }}
          />
        </Box>
        <Skeleton
          variant="rounded"
          width={155}
          height={30}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginRight: '18px',
          }}
        />
      </Box>
    </>
  );
}
