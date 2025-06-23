'use server'
import tracks from '@/_data/circuits.json';
import meetings from '@/_data/meetings.json';
import teams from '@/_data/teams.json';
import axios from "axios";
import { getNextMeeting, getLastPastMeeting } from '../utils';
axios.defaults.baseURL = 'https://api.openf1.org/v1';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export async function GetSessionKey(): Promise<number> {
    try {
        const meetings = await GetMeetings();
        const lastMeeting = getLastPastMeeting(meetings);

        let res;
        if (lastMeeting && lastMeeting.date_start) {
            const encodedDate = encodeURIComponent(lastMeeting.date_start);
            res = await axios.get(`/sessions?date_start>=${encodedDate}`);
        } else {
            res = await axios.get(`/sessions`);
        }

        const sessionKeyArray = res.data;

        if (Array.isArray(sessionKeyArray) && sessionKeyArray.length > 0) {
            const session = sessionKeyArray[sessionKeyArray.length - 1];
            return session.session_key;
        } else {
            throw new Error('No session data found');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function GetMeetings(): Promise<Meeting[]> {
    return meetings
}

export async function GetDrivers(): Promise<Array<Driver>> {
    const sessionKey = await GetSessionKey()
    const res = await axios.get(`/drivers?session_key=${sessionKey}`)
    return res.data
}

export async function GetCircuits(): Promise<Array<Track>> {
    return tracks
}

export async function GetTeams(name?: string): Promise<Team[]> {
    return teams
}

export async function GetErgastTeams(): Promise<Array<Constructor>> {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/constructors/?format=json")
    const data: ErgastResponse = await res.json()
    return data.MRData.ConstructorTable.Constructors
}

export async function GetErgastRaces(): Promise<Race[]> {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/races/?format=json")
    const data: ErgastResponse = await res.json()
    return data.MRData.RaceTable.Races
}

export async function GetErgastDrivers(year?: number): Promise<DriverErgast[]> {
    const date = new Date()
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year ?? date.getUTCFullYear()}/drivers/?format=json`)
    const data: ErgastResponse = await res.json()
    return data.MRData.DriverTable.Drivers
}

export async function GetErgastDriverStandingList(): Promise<DriverStanding[]
> {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/driverstandings/?format=json")
    const data: ErgastResponse = await res.json()
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

export async function GetErgastTeamStandingList(): Promise<ConstructorStanding[]
> {
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/constructorstandings/?format=json")
    const data: ErgastResponse = await res.json()
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
}






