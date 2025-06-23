import {getContrastTextColor} from "@/lib/utils"
import {StandingTableItem} from "./StandingsTableItem"

export const TeamStandings = ({constructors, teams}: {constructors: Array<ConstructorStanding>; teams: Array<Team>}) =>
    constructors.map(({position, points, Constructor}, index) => {
        const filteredTeam = teams.filter(({constructorId}) => constructorId === Constructor.constructorId)[0]
        const color = filteredTeam.color as string
        const contrastColor = getContrastTextColor(color)

        return (
            <StandingTableItem
                key={index}
                color={color}
                contrastColor={contrastColor}
                image={filteredTeam.variant}
                nameLabel={filteredTeam.name}
                points={points}
                position={position}
            />
        )
    })
