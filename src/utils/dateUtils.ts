export const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};