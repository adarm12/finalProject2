import React from "react";
import {sendApiPostRequest} from "./ApiRequests";
import PersonalGamblingPage from "./PersonalGamblingPage";

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
        this.login()
    }

    login = () => {
        console.log("-----------------");

        const event = new EventSource("http://localhost:9123/streaming");
        event.onopen = function () {
            console.log('connection is opened. ' + event.readyState)
        };
        let context = this;
        event.onmessage = function (message) {
            const update = JSON.parse(message.data);
            context.setState({
                list: update.list,
                current: update.current,
            })
        };
    }

    render() {
        return (
            <div>
                {this.state.gambling === false ?
                    <div>
                        <label> Live Dashboard </label>
                        <div></div>
                        {this.state.list.length !== 7 ?
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
                                    </tr>
                                    </thead>
                                    {this.state.current.map((currentList, Index) => (
                                        <tbody>
                                        <tr key={Index}>
                                            <td>{currentList.round}</td>
                                            <td>{currentList.team1.teamName}</td>
                                            <td>{currentList.team1Goals}</td>
                                            <td> VS</td>
                                            <td>{currentList.team2.teamName}</td>
                                            <td>{currentList.team2Goals}</td>
                                            {this.stateFromLoginPage.connectionMessage === "Successfully connected" ?
                                                <button onClick={() => this.setState({
                                                    gambling: true,
                                                    balance: this.stateFromLoginPage.balance,
                                                    team1: currentList.team1.teamName,
                                                    team2: currentList.team2.teamName
                                                })} style={{width: 50, height: 25}}> Bet </button>
                                                :
                                                <div>
                                                </div>
                                            }
                                        </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            :
                            <label style={{color: "red"}}>
                                The live rounds are over!
                            </label>
                        }
                        {this.state.list.length > 0 ?
                            <div>
                                <label> Previous Rounds </label>
                                <table style={{width: 600}}>
                                    <thead>
                                    <tr>
                                        <td style={{width: 50}}>Round</td>
                                        <td style={{width: 200}}>Home</td>
                                        <td style={{width: 50}}>Goals</td>
                                        <td style={{width: 200}}>Away</td>
                                        <td style={{width: 50}}>Goals</td>
                                    </tr>
                                    </thead>
                                    {this.state.list.map((roundList, matchupsIndex) => (
                                        <tbody key={matchupsIndex}>
                                        {roundList.map((matchup, roundIndex) => (
                                            <tr key={roundIndex}>
                                                <td>{matchup.round}</td>
                                                <td className="column">{matchup.team1.teamName}</td>
                                                <td>{matchup.team1Goals}</td>
                                                <td className="column">{matchup.team2.teamName}</td>
                                                <td>{matchup.team2Goals}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    :
                    <PersonalGamblingPage stateFromLive={this.state}></PersonalGamblingPage>
                }
            </div>

        );
    }
}

export default LiveDashboard;

