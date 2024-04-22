import React from "react";
import {sendApiPostRequest} from "./ApiRequests";
import PersonalGamblingPage from "./PersonalGamblingPage";

class LiveDashboard extends React.Component {
    state = {
        list: [],
        current: [],
        bets: [],
        team1: "",
        team2: "",
        balance: "",
        userSecret: "",
        gambling: false,
        matchupId: "",
    }

    stateFromLoginPage = this.props.stateFromLogin;

    componentDidMount() {
        this.live()
        console.log("State from LoginPage:", this.stateFromLoginPage);
    }

    live = () => {
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
                bets: update.bets,
            })
        };
    }

    changeScreen = () => {
        this.setState({
            gambling: !this.state.gambling
        })
    }


    render() {
        return (
            <div>
                <button onClick={this.props.changeLive}>Go Back</button>
                {!this.state.gambling ?
                    <div>
                        bets: {this.state.bets.length}
                        <label> Live Dashboard </label>
                        {this.state.list.length !== 7 ?
                            <div>
                                <label> Current Round </label>
                                <table style={{width: 575}}>
                                    <thead>
                                    <tr>
                                        <td>Round</td>
                                        <td>Home</td>
                                        <td>Goals</td>
                                        <td></td>
                                        <td>Away</td>
                                        <td>Goals</td>
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
                                            {this.stateFromLoginPage.loginSuccess ?
                                                <button onClick={() => this.setState({
                                                    gambling: true,
                                                    balance: this.stateFromLoginPage.balance,
                                                    userSecret: this.stateFromLoginPage.secret,
                                                    matchupId: currentList.id,
                                                    team1: currentList.team1.teamName,
                                                    team2: currentList.team2.teamName,
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
                                <table style={{width: 575}}>
                                    <thead>
                                    <tr>
                                        <td>Round</td>
                                        <td>Home</td>
                                        <td>Goals</td>
                                        <td></td>
                                        <td>Away</td>
                                        <td>Goals</td>
                                    </tr>
                                    </thead>
                                    {this.state.list.map((roundList, matchupsIndex) => (
                                        <tbody key={matchupsIndex}>
                                        {roundList.map((matchup, roundIndex) => (
                                            <tr key={roundIndex}>
                                                <td>{matchup.round}</td>
                                                <td className="column">{matchup.team1.teamName}</td>
                                                <td>{matchup.team1Goals}</td>
                                                <td>VS</td>
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
                    <PersonalGamblingPage stateFromLive={this.state}
                                          changeScreen={this.changeScreen}
                    ></PersonalGamblingPage>
                }
            </div>

        );
    }
}

export default LiveDashboard;

