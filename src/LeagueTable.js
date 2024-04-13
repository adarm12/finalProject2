import React from "react";
import {sendApiPostRequest} from "./ApiRequests";

class LeagueTable extends React.Component {

    state = {
        teamsList: [],
    };


    componentDidMount() {
        this.teams();
        this.refreshInterval = setInterval(() => {
            this.teams();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    teams = () => {
        sendApiPostRequest("http://localhost:9123/get-teams", {}, (response) => {
            this.setState({teamsList: response.data})
        });
    }

    render() {
        return (
            <div>
                <label>League Table</label>
                <div></div>
                <table style={{width: 800}}>
                    <thead>
                    <tr>
                        <td>team name</td>
                        <td>points</td>
                        <td>goals difference</td>
                        <td>offensive rating</td>
                        <td>defensive rating</td>
                        <td>player injuries</td>
                    </tr>
                    </thead>
                    {this.state.teamsList.map((teams, teamsIndex) => (
                        <tbody>
                        <tr key={teamsIndex}/>
                        <td style={{width: 200}}>{teams.teamName}</td>
                        <td>{teams.points}</td>
                        <td style={{width: 150}}>{teams.goalsDifference}</td>
                        <td style={{width: 150}}>{teams.offensiveRating}</td>
                        <td style={{width: 150}}>{teams.defensiveRating}</td>
                        <td style={{width: 150}}>{teams.playerInjuries}</td>
                        </tbody>
                    ))}
                </table>
            </div>
        );
    }
}

export default LeagueTable;