import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import type { JSX } from 'react';

export default function LoadingSkeleton(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'block',
        position: 'relative',
        paddingTop: '20px',
        margin: '0 auto',
        width: '940px',
        height: '430px',
        transform: 'translateX(2px)',
      }}
      width={940}
      height={430}
    >
      <Skeleton
        animation="pulse"
        variant="text"
        width={200}
        sx={{
          fontSize: '17px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          marginBottom: '10px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <Skeleton
          animation="pulse"
          variant="rectangular"
          width={616}
          height={353}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Box
          width={325}
          height={353}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            height={50}
            width={325}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: '2px',
              paddingLeft: '2px',
              paddingTop: '10px',
              marginTop: '15px',
            }}
          >
            <Skeleton
              animation="pulse"
              variant="text"
              width={260}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '16px',
                transform: 'translateX(-20px)',
              }}
            />
          </Box>
          <Box
            height={158}
            width={344}
            sx={{
              display: 'inline-block',
              transform: 'translateX(-15px)',
            }}
          >
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={143}
              height={69}
              sx={{
                display: 'inline-block',
                margin: '5px 10px 0 0',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateX(15px)',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={162}
              height={69}
              sx={{
                display: 'inline-block',
                margin: '5px 10px 0 0',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateX(15px)',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={143}
              height={69}
              sx={{
                display: 'inline-block',
                margin: '5px 10px 0 0',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateX(15px)',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={162}
              height={69}
              sx={{
                display: 'inline-block',
                margin: '5px 10px 0 0',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateX(15px)',
              }}
            />
          </Box>
          <Skeleton
            animation="pulse"
            variant="text"
            width={130}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '16px',
              marginRight: '13px',
              marginLeft: '13px',
              paddingTop: '10px',
              marginTop: '15px',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2px',
              fontSize: '16px',
              marginRight: '13px',
              marginLeft: '13px',
              paddingTop: '10px',
              marginTop: '-10px',
            }}
          >
            <Skeleton
              animation="pulse"
              variant="text"
              width={60}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '20px',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="text"
              width={40}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '20px',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="text"
              width={60}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '20px',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="text"
              width={70}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '20px',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              marginRight: '13px',
              marginLeft: '13px',
              paddingTop: '10px',
              marginTop: '10px',
            }}
          >
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={60}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '10px',
              }}
            />
            <Skeleton
              animation="pulse"
              variant="rectangular"
              width={20}
              height={20}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '10px',
                marginTop: '-5px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
