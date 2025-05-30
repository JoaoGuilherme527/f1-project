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
            const session = sessionKeyArray[sessionKeyArray.length - 1]; // or 0 if you want first
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

export async function GetDrivers(): Promise<Array<Pilot> | Error> {
    try {
        const sessionKey = await GetSessionKey()
        const res = await axios.get(`/drivers?session_key=${sessionKey}`)
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function GetCircuits(): Promise<Array<Track>> {
    return tracks
}

export async function GetTeams(name?: string): Promise<Array<Team>> {
    return name ? teams.filter((team) => team.name === name) : teams
}

export async function GetErgastRaces():Promise<Race[] | undefined>{
    const res = await fetch("https://api.jolpi.ca/ergast/f1/2025/races/?format=json")
    const data: ErgastResponse = await res.json()
    return data.MRData.RaceTable?.Races

}


