const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const remainingSecondsAfterHours = duration % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = remainingSecondsAfterHours % 60;
  
    let formattedDuration;
    if (hours > 0) {
      formattedDuration = `${hours}:${minutes}:${seconds}`;
    } else {
      formattedDuration = `${minutes}:${seconds}`;
    }
  
    return formattedDuration;
  };

  export default formatDuration;