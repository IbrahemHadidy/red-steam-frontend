const getPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('mac')) {
    return 'darwin';
  } else if (userAgent.includes('win')) {
    return 'win32';
  } else {
    return 'unknown';
  }
};

export default getPlatform;