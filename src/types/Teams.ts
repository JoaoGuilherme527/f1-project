interface Team {
    constructorId: string
    name: string
    logo: string
    variant: string
    color: string
    pilots: Array<{ year: string, drivers: Array<string> }>
    car: string
}