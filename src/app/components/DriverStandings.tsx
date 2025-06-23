import {getContrastTextColor} from "@/lib/utils"
import {StandingTableItem} from "./StandingsTableItem"

export const DriverTable = ({drivers, teams}: {drivers: Array<DriverStanding>; teams: Array<Team>}) =>
    drivers.map(({position, points, Driver}, index) => {
        let teamName = ""
        for (let team of teams) {
            for (let pilots of team.pilots) {
                if (Number(pilots.year) == 2025) {
                    for (let _driver of pilots.drivers) {
                        if (_driver.toLowerCase().includes(Driver.givenName.toLowerCase())) {
                            teamName = team.name
                        }
                    }
                }
            }
        }
        const filteredTeam = teams.filter(({name}) => name === teamName)[0]
        const color = filteredTeam.color as string
        const contrastColor = getContrastTextColor(color)

        return (
            <StandingTableItem
                key={index}
                color={color}
                contrastColor={contrastColor}
                image={filteredTeam.variant}
                nameLabel={Driver.familyName}
                points={points}
                position={position}
            />
        )
    })
