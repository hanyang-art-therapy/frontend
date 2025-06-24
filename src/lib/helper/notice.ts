export const getEgType = (category: string) => {
  if (category === '전체') {
    return undefined;
  }

  if (category === '일반') {
    return 'GENERAL';
  }
  if (category === '실습') {
    return 'PRACTICE';
  }
  if (category === '모집') {
    return 'RECRUIT';
  }
  if (category === '전시') {
    return 'EXHIBITION';
  }

  return 'ACADEMIC';
};

export const getKoType = (category: string | undefined) => {
  switch (category) {
    case 'GENERAL':
      return '일반';
    case 'PRACTICE':
      return '실습';
    case 'RECRUIT':
      return '모집';
    case 'EXHIBITION':
      return '전시';
    case 'ACADEMIC':
      return '학술';
    default:
      return '';
  }
};
