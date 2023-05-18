export const getTimeAgoString = (timedate: Date): string => {
  const date = new Date(timedate);
  const now = new Date();
  const seconds = Math.round((now.valueOf() - date.valueOf()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};

export const formatDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};