// Formato hora 12h con am/pm en español de Colombia
export function formatterHour12(time24) {
  const [h, m] = time24.split(':').map(Number);

  let hour = h % 12 || 12;        // de 0-23 a 1-12
  let suffix = h < 12 ? ' am' : ' pm';

  return `${hour}:${m.toString().padStart(2, '0')}${suffix}`;
}
