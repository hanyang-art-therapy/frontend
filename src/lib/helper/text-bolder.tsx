export const parseTextWithBold = (text: string) => {
  const boldRegex = /(\*\*.*?\*\*)/g;
  const parts = text.split(boldRegex);

  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={part}>{boldText}</strong>;
    }

    return part;
  });
};
