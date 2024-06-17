const ONLINE_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

const isUserOnline = (lastActive) => {
  const lastActiveTime = new Date(lastActive).getTime();
  const currentTime = new Date().getTime();
  return currentTime - lastActiveTime <= ONLINE_THRESHOLD;
};

export { isUserOnline, ONLINE_THRESHOLD };
