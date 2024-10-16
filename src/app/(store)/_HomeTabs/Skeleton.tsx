import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import type { JSX } from 'react';

const Tap = () => (
  <Skeleton
    sx={{
      display: 'inline-block',
      marginRight: '5px',
      borderRadius: '0',
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }}
    variant="rectangular"
    width={90}
    height={35}
    animation="wave"
  />
);

const Item = () => (
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      background: 'rgba(0, 0, 0, 0.1)',
      marginBottom: '5px',
    }}
    height={69}
  >
    <Skeleton
      variant="rectangular"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
      height={69}
      width={184}
      animation="wave"
    />
    <Box>
      <Skeleton
        variant="text"
        sx={{
          fontSize: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
        width={100}
        animation="wave"
      />
      <Skeleton
        variant="text"
        sx={{
          fontSize: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
        width={270}
        animation="wave"
      />
    </Box>
    <Skeleton
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        float: 'right',
        marginRight: '16px',
        marginTop: '22px',
        width: '133px',
        textAlign: 'right',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      }}
      variant="rounded"
      animation="wave"
    />
  </Box>
);

const Tag = () => (
  <Skeleton
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginTop: '2px',
      marginBottom: '-2px',
      width: '20%',
    }}
    height={20}
    variant="rounded"
    animation="wave"
  />
);

const ScreenShot = () => (
  <Skeleton
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      marginBottom: '2px',
    }}
    variant="rectangular"
    width={272}
    height={136}
    animation="wave"
  />
);

export default function LoadingSkeleton(): JSX.Element {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '940px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        transition: 'padding 0.25s',
        marginTop: '-31px',
        minHeight: '815px',
      }}
    >
      <Box
        sx={{
          width: '618px',
          position: 'relative',
          float: 'none',
          minWidth: '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            marginBottom: '8px',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: '31px',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <Tap />
              <Tap />
              <Tap />
              <Tap />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              background: 'rgba(0, 0, 0, 0.1)',
              padding: '4px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '28px',
            }}
          >
            <Skeleton
              sx={{
                fontSize: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: '40px',
                marginRight: '2px',
              }}
              animation="wave"
            />
            <Skeleton
              sx={{
                fontSize: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: '80px',
              }}
              animation="wave"
            />
          </Box>
        </Box>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Box>

      <Box
        sx={{
          width: '308px',
          float: 'none',
          minWidth: '0',
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1',
          marginLeft: '14px',
        }}
      >
        <Box
          sx={{
            flex: '1 1',
            position: 'relative',
            marginTop: '39px',
            background: 'rgba(255, 255, 255, 0.1)',
            marginBottom: '5px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '9px',
              left: '16px',
              transition: 'opacity 300ms',
              width: '292px',
            }}
          >
            <Skeleton
              sx={{
                fontSize: '23px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: '90%',
              }}
              animation="wave"
            />
            <Skeleton
              sx={{
                padding: '5px 7px',
                marginBottom: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: '258px',
                borderRadius: '4px',
                boxSizing: 'content-box',
                height: '100px',
                marginTop: '-10px',
              }}
              animation="wave"
            />
            <Box
              sx={{
                marginTop: '-28px',
                display: 'flex',
                flexDirection: 'row',
                gap: '2px',
                width: '100%',
              }}
              height={30}
            >
              <Tag />
              <Tag />
              <Tag />
              <Tag />
            </Box>
            <ScreenShot />
            <ScreenShot />
            <ScreenShot />
            <ScreenShot />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
