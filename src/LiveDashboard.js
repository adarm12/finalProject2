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
            this.setState({matchupsList: response.data});
        });
    };

    render() {
        return (
            <div>
                <label> Live Dashboard </label>
                <table>
                    <thead>
                    <tr>
                        <td>Round</td>
                        <td>Home team</td>
                        <td>Home team points</td>
                        <td>Away team</td>
                        <td>Away team points</td>
                    </tr>
                    </thead>
                    {this.state.matchupsList.map((innerList, index) => (
                        <tbody key={index}>
                        {innerList.map((matchup, innerIndex) => (
                            <tr key={innerIndex}>
                                <td>{matchup.round}</td>
                                <td class="column">{matchup.team1.teamName}</td>
                                <td>{matchup.team1.points}</td>
                                <td class="column">{matchup.team2.teamName}</td>
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
