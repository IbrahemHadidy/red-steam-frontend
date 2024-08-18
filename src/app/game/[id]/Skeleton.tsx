import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

// Types
import type { FC, JSX } from 'react';

const LoadingSkeleton: FC = (): JSX.Element => {
  return (
    <>
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
        width={904}
        height={18}
        sx={{
          padding: '18px',
          margin: '0 auto',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          transform: 'translateX(2px)',
        }}
      >
        <Skeleton
          variant="text"
          width={400}
          height={18}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '16px',
          margin: '0 auto',
          transform: 'translateX(2px)',
          width: '940px',
          gap: '14px',
        }}
      >
        <Box sx={{ marginTop: '16px', width: '616px' }}>
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
          width={272}
          sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <Box>
            <Box
              width={272}
              height={24}
              sx={{
                padding: '10px 18px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
            </Box>
            <Box
              width={272}
              height={48}
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
            width={276}
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
    </>
  );
};

export default LoadingSkeleton;
