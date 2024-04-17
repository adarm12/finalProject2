import React from "react";
import PersonalGamblingPage from "./PersonalGamblingPage";
import axios from "axios";

class LiveDashboard extends React.Component {
    state = {
        list: [],
        current: [],
        team1: "",
        team2: "",
        gambling: false,
    }

    stateFromLoginPage = this.props.stateFromLogin;

    componentDidMount() {
        this.startLiveGame();
    }

    startLiveGame = () => {
        console.log("start Live game ------------------------------");
        const event = new EventSource("http://localhost:9123/streaming");
        event.onopen = () => {
            console.log('connection is opened. ' + event.readyState);
        };
        event.onmessage = (message) => {
            const update = JSON.parse(message.data);
            this.setState({
                list: update.list,
                current: update.current
            });
        };
    }

    render() {
        return (
            <div>
                { !this.state.gambling ? (
                    <div>
                        <label> Live Dashboard </label>
                        <div>
                            <label> Current Round </label>
                            <table style={{width: 600}}>
                                <thead>
                                <tr>
                                    <td style={{width: 50}}>Round</td>
                                    <td style={{width: 200}}>Home</td>
                                    <td style={{width: 50}}>Goals</td>
                                    <td style={{width: 50}}></td>
                                    <td style={{width: 200}}>Away</td>
                                    <td style={{width: 50}}>Goals</td>
                                    <td style={{width: 50}}>Bet</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.list.length !== 7 ? (
                                    this.state.current.map((currentList, Index) => (
                                        <tr key={Index}>
                                            <td>{currentList.round}</td>
                                            <td>{currentList.team1.teamName}</td>
                                            <td>{currentList.team1Goals}</td>
                                            <td> VS</td>
                                            <td>{currentList.team2.teamName}</td>
                                            <td>{currentList.team2Goals}</td>
                                            <td>
                                                {this.stateFromLoginPage.connectionSuccess &&
                                                    <button onClick={() => this.setState({
                                                        gambling: true,
                                                        balance: this.stateFromLoginPage.balance,
                                                        team1: currentList.team1.teamName,
                                                        team2: currentList.team2.teamName
                                                    })} style={{width: 50, height: 25}}> Bet </button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{color: "red"}}>
                                            The live rounds are over!
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <PersonalGamblingPage stateFromLive={this.state}></PersonalGamblingPage>
                )}
            </div>
        );
    }
}

export default LiveDashboard;
