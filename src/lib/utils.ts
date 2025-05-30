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


export function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const pad = (n: number) => n.toString().padStart(2, "0")
    return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) }
}

export const getWeekdayShort = (date: Date) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getUTCDay()]
export const getMonthShort = (date: Date) =>
    ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getUTCMonth()]
