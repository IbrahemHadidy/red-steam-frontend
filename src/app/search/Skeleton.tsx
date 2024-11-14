import { Box, Skeleton } from '@mui/material';

import useResponsiveViewport from '@hooks/useResponsiveViewport';

export function ResultSkeleton() {
  const isViewport695OrLess = useResponsiveViewport(695);

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.2)',
        marginBottom: '5px',
        marginLeft: '1px',
        display: 'block',
        borderRadius: '0',
        width: isViewport695OrLess ? 'auto' : '683px',
        height: isViewport695OrLess ? 'auto' : '45px',
        padding: isViewport695OrLess ? '5px' : undefined,
      }}
    >
      <Skeleton
        variant="rectangular"
        width={120}
        height={45}
        sx={{
          display: isViewport695OrLess ? 'block' : 'inline-block',
          float: isViewport695OrLess ? 'left' : undefined,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Box
        sx={{
          display: isViewport695OrLess ? 'block' : 'inline-block',
          overflow: isViewport695OrLess ? 'hidden' : undefined,
          verticalAlign: 'top',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '10px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: isViewport695OrLess ? 'auto' : '45px',
          }}
          width={275}
        >
          <Skeleton
            variant="text"
            width={200}
            sx={{
              fontSize: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginTop: '3px',
            }}
          />
          <Skeleton
            variant="rectangular"
            width={15}
            height={15}
            sx={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          {isViewport695OrLess && (
            <Box>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'inline-block',
                  verticalAlign: 'top',
                }}
                width={70}
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginLeft: '15px',
                  marginTop: '4px',
                }}
                width={18}
                height={18}
              />
            </Box>
          )}
        </Box>
        {!isViewport695OrLess && (
          <>
            <Skeleton
              variant="text"
              sx={{
                fontSize: '11px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'inline-block',
                verticalAlign: 'top',
                marginTop: '13px',
              }}
              width={70}
            />
            <Skeleton
              variant="rectangular"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginTop: '13px',
                marginLeft: '25px',
              }}
              width={18}
              height={18}
            />
            <Skeleton
              variant="text"
              sx={{
                fontSize: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'inline-block',
                verticalAlign: 'top',
                marginTop: '10px',
                marginLeft: '85px',
              }}
              width={70}
            />
          </>
        )}
        {isViewport695OrLess && (
          <Skeleton
            variant="text"
            sx={{
              fontSize: '11px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'inline-block',
              verticalAlign: 'top',
              marginTop: '50px',
              float: 'right',
            }}
            width={70}
          />
        )}
      </Box>
    </Box>
  );
}

export function LoadingResults() {
  return (
    <>
      <ResultSkeleton />
      <ResultSkeleton />
      <ResultSkeleton />
    </>
  );
}
