const get7DaysFromNow = (): Date => {
  const now: Date = new Date();
  now.setDate(now.getDate() + 7);
  return now;
};

export default get7DaysFromNow;
