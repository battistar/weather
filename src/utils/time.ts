// iOS fix
const dateFromISO = (isoDate: string): Date => {
  const fixedISODate = isoDate.replace(' ', 'T');

  return new Date(fixedISODate);
};

export const getHoursFromISO = (isoDate: string, now = false): string => {
  const hour = dateFromISO(isoDate).getHours();
  const currentHour = new Date().getHours();

  if (hour === currentHour && now) {
    return 'Now';
  } else {
    return ('0' + hour).slice(-2);
  }
};
