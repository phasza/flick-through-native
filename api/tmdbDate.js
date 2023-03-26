// TMDB dates in DB are formatted yyyy-MM-dd
export const getYearFromDate = (date) => {
  if (date === '') {
    return date;
  }

  return date.split('-')[0];
};

// TODO locals
export const formatDate = (date) => {
  if (date === '') {
    return date;
  }

  const parts = date.split('-');
  if (parts.length !== 3) {
    return date;
  }

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
