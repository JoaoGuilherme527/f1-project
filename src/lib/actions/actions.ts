'use server'
import { Circuit } from "@/types/Circuits";
import axios from "axios";
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

export async function GetDrivers(key: string | undefined, year: number): Promise<Array<Driver> | Error> {
    try {
        const sessionKey = key ? Number(key) : Number(await GetSessionKey(year))
        const res = await fetch("http://localhost:3000/drivers.json")
        const data = await res.json();
        const driversFiltered = data.filter(({ session_key }: Driver) => session_key === sessionKey)
        return driversFiltered
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function GetCircuits(): Promise<Array<Circuit> | Error> {
    try {
        const res = await fetch("http://localhost:3000/circuits.json")
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}