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

    checkPoints() {
        let copyList = new Set();
        let exist = false;
        for (let i = 0; i < this.state.teamsList.length; i++) {
            if (!copyList.has(this.state.teamsList[i].points))
                copyList.add(this.state.teamsList[i].points);
            else
                exist = true;
        }
        return exist;
    }

    sortTable = () => {
        const listToSort = [...this.state.teamsList];
        listToSort.sort((a, b) => b.points - a.points);
        if (this.checkPoints()) {
            listToSort.sort((a, b) => b.goalsDifference - a.goalsDifference);
        }
        this.setState({teamsList: listToSort});
    }

    highestLeagueStyle = (index) => {
        if (index === 0)
            return '#CCFFCC';
    }

    render() {
        return (
            <div>
                <button onClick={this.props.changeTable}>Go Back</button>
                <label>League Table</label>
                <table style={{width: 800}}>
                    <thead>
                    <tr>
                        <td>Team Name</td>
                        <td>Points</td>
                        <td>Goals Difference</td>
                        <td>Offensive Rating</td>
                        <td>Defensive Rating</td>
                        <td>Player Injuries</td>
                    </tr>
                    </thead>
                    {this.state.teamsList.map((teams, teamsIndex) => (
                        <tbody>
                        {this.sortTable()}
                        <tr key={teamsIndex}/>
                        <td style={{background: this.highestLeagueStyle(teamsIndex)}}>{teams.teamName}</td>
                        <td style={{background: this.highestLeagueStyle(teamsIndex)}}>{teams.points}</td>
                        <td style={{background: this.highestLeagueStyle(teamsIndex)}}>{teams.goalsDifference}</td>
                        <td style={{background: this.highestLeagueStyle(teamsIndex)}}>{teams.offensiveRating}</td>
                        <td style={{background: this.highestLeagueStyle(teamsIndex)}}>{teams.defensiveRating}</td>
                        <td style={{background: this.highestLeagueStyle(teamsIndex)}}>{teams.playerInjuries}</td>
                        </tbody>
                    ))}
                </table>
            </div>
        );
    }
}

export default LeagueTable;