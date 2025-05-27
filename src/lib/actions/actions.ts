'use server'
import drivers from '@/_data/drivers.json';
import tracks from '@/_data/circuits.json';
import meetings from '@/_data/meetings.json';
import axios from "axios";
import { Meeting } from "@/types/Utils";
axios.defaults.baseURL = 'https://api.openf1.org/v1';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export async function GetSessionKey(year: number): Promise<number> {
    const res = await axios.get(`/sessions?year=${year}`)
    const sessionKeyArray = res.data
    const data = sessionKeyArray[sessionKeyArray.length - 1]
    return data.session_key
}


export async function GetMeetings(year: number): Promise<Meeting[] | Error> {
    try {
        // const res = await axios.get(`/meetings?year=${year}`)
        // return res.data.slice(-1)[0]
        return meetings
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function GetDrivers(key: string | undefined, year: number): Promise<Array<Pilot> | Error> {
    try {
        const driversFiltered = drivers.slice(-20)
        return driversFiltered
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function GetCircuits(): Promise<Array<Track> | Error> {
    try {
        return tracks
    } catch (error) {
        console.log(error);
        throw error
    }
}