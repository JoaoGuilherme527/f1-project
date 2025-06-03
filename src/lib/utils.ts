export function getLastPastMeeting(meetings: Meeting[]): Meeting | null {
  const now = new Date()
  const pastMeetings = meetings
    .map((meeting) => ({
      ...meeting,
      dateObj: new Date(meeting.date_start),
    }))
    .filter((meeting) => meeting.dateObj <= now)
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())  // Descending order

  return pastMeetings.length > 0 ? pastMeetings[0] : null
}

export function getNextMeeting(meetings: Meeting[]): Meeting | null {
  const now = new Date()
  return (
    meetings
      .map((m) => ({ ...m, dateObj: new Date(m.date_start) }))
      .filter((m) => m.dateObj > now)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())[0] || null
  )
}

export const pad = (n: number) => n.toString().padStart(2, "0")

export function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) }
}

export const getWeekdayShort = (date: Date) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getUTCDay()]
export const getMonthShort = (date: Date) =>
  ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getUTCMonth()]


export function offsetToEtcTimezone(offset: string): string {
  const match = offset.match(/([+-])(\d{2}):(\d{2})/);

  if (!match) {
    throw new Error("Invalid GMT offset format");
  }

  const sign = match[1];
  const hours = parseInt(match[2], 10);

  const etcSign = sign === '+' ? '-' : '+';

  return `Etc/GMT${etcSign}${hours}`;
}

export function getTimeInOffset(date: string, time: string | undefined, gmt_offset: string): string {
  const isoString = `${date}T${time ?? '00:00:00'}`;
  const dateObj = new Date(isoString);

  const timeZone = offsetToEtcTimezone(gmt_offset);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return formatter.format(dateObj);
}

export function getContrastTextColor(background: string): string {
  const rgb = background
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);

  const [r, g, b] = rgb.map(v => v / 255);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 0.5 ? '#000' : '#fff';
}

