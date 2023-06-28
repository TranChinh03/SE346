const percentage = (total, number) => {
    const percent = Math.floor(number/total)
    const formatPercent = `${percent}%`
    return formatPercent;
  };

  export default percentage;