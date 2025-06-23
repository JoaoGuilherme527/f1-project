import TeamsPage from "@/app/_pages/TeamsPage"
import {GetErgastTeams, GetTeams} from "@/lib/actions/actions"

export default async function Render() {
    const [teams, constructors] = await Promise.all([GetTeams(), GetErgastTeams()])
    const concatTeams = teams.map((team) => {
        const index = constructors.findIndex((constructor) => constructor.constructorId == team.constructorId)
        return {...constructors[index],...team}
    })

    return <TeamsPage teams={concatTeams}/>
}
