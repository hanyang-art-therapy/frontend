export const parseTextWithBold = (text: string) => {
  const regex = /(\*\*.*?\*\*|<br \/>)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={part + index}>{boldText}</strong>;
    }

    if (part === '<br />') {
      return <br key={part + index} />;
    }

    return part;
  });
};
