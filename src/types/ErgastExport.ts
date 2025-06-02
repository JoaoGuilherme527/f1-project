export const sessionKeys: SessionKey[] = [
    "FirstPractice",
    "SecondPractice",
    "ThirdPractice",
    "Qualifying",
    "Sprint"
];

export const sessionValues = [
    "PRACTICE 1",
    "PRACTICE 2",
    "PRACTICE 3",
    "QUALIFYING",
    "SPRINT"
];

export const getNameOfSession = (key: number) => {
    return sessionValues[key]
}
