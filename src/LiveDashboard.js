import React from "react";
import {sendApiPostRequest} from "./ApiRequests";

class LiveDashboard extends React.Component {
    state = {
        matchupsList: [],
    };

    componentDidMount() {
        this.startLeague();
    }

    startLeague = () => {
        sendApiPostRequest("http://localhost:9123/start-league", {}, (response) => {
            this.setState({matchupsList: response.data})
        });
    }

    render() {
        return (
            <div>
                <label> Live Dashboard </label>
                <div></div>
                <table>
                    <thead>
                    <tr>
                        <td>Round</td>
                        <td>Home</td>
                        <td>Off</td>
                        <td>Def</td>
                        <td>Points</td>
                        <td>Away </td>
                        <td>Off</td>
                        <td>Def</td>
                        <td>Points</td>
                    </tr>
                    </thead>
                    {this.state.matchupsList.map((roundList, matchupsIndex) => (
                        <tbody key={matchupsIndex}>
                        {roundList.map((matchup, roundIndex) => (
                            <tr key={roundIndex}>
                                <td>{matchup.round}</td>
                                <td class="column">{matchup.team1.teamName}</td>
                                <td>{matchup.team1.offensiveRating}</td>
                                <td>{matchup.team1.defensiveRating}</td>
                                <td>{matchup.team1.points}</td>
                                <td class="column">{matchup.team2.teamName}</td>
                                <td>{matchup.team2.offensiveRating}</td>
                                <td>{matchup.team2.defensiveRating}</td>
                                <td>{matchup.team2.points}</td>
                            </tr>
                        ))}
                        </tbody>
                    ))}
                </table>
            </div>
        );
    }
}

export default LiveDashboard;
