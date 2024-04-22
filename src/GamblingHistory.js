import React from "react";

class GamblingHistory extends React.Component {

    state = {
        bets: [],
    }

    stateFromLoginPage = this.props.stateFromLogin;

    componentDidMount() {
        this.betsList()

    }

    betsList = () => {
        const event = new EventSource("http://localhost:9123/streaming");
        event.onopen = function () {
            console.log('connection is opened. ' + event.readyState)
        };
        let context = this;
        event.onmessage = function (message) {
            const update = JSON.parse(message.data);
            context.setState({
                bets: update.bets,
            })
        };
    }

    render() {
        return (
            <div>
                <button onClick={this.props.changeHistory}>Go Back</button>
                <label> Gambling History</label>
                <div>
                    <table style={{width: 600}}>
                        <thead>
                        <tr>
                            <td>Home</td>
                            <td>Away</td>
                            <td>Result</td>
                            <td>Bet Amount</td>
                        </tr>
                        </thead>
                        {this.state.bets.map((betsList, Index) => (
                            <tbody>
                            {this.stateFromLoginPage.secret === betsList.user.secret ?
                                <tr key={Index}>
                                    <td>{betsList.matchup.team1.teamName}</td>
                                    <td>{betsList.matchup.team2.teamName}</td>
                                    <td>{betsList.result}</td>
                                    <td>{betsList.amount}</td>
                                </tr>
                                :
                                <tr>
                                </tr>
                            }
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        )
    }
}

export default GamblingHistory;