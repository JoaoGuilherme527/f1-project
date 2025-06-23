interface ErgastBaseResponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: RaceTable;
    StandingsTable: StandingsTable;
    DriverTable: DriverTable;
    ConstructorTable: ConstructorTable
  };
}

interface ConstructorTable{
  season: string;
  Constructors: Constructor[]
}

interface RaceTable {
  season: string;
  Races: Race[];
}

interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  FirstPractice?: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Qualifying?: Session;
  Sprint?: Session;
}

interface Session {
  date: string;
  time?: string;
}

type SessionKey = 'FirstPractice' | 'SecondPractice' | 'ThirdPractice' | 'Qualifying' | 'Sprint';

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}


interface StandingsTable {
  season: string;
  round: string;
  StandingsLists: StandingsList[];
  ConstructorStandings: ConstructorStanding[];
}

interface DriverTable {
  season: string;
  Drivers: DriverErgast[]
}

interface StandingsList extends StandingsTable {
  DriverStandings: DriverStanding[]
}

interface DriverStanding {
  position: string;
  points: string;
  wins: string;
  Driver: DriverErgast;
  Constructors: Constructor[];
}

interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

interface DriverErgast {
  driverId: string;
  permanentNumber?: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

type ErgastResponse = ErgastBaseResponse;
