// iOS fix
const dateFromISO = (isoDate: string): Date => {
  const fixedISODate = isoDate.replace(' ', 'T');

  return new Date(fixedISODate);
};

export const getHoursFromISO = (isoDate: string): string => {
  const hour = dateFromISO(isoDate).getHours();

  return `${('0' + hour).slice(-2)}:00`;
};

export const isCurrentDay = (isoDate: string): boolean => {
  return new Date().setHours(0, 0, 0, 0) === new Date(isoDate).setHours(0, 0, 0, 0);
};

export const isCurrentHour = (isoDate: string): boolean => {
  return new Date().getHours() === new Date(isoDate).getHours();
};
