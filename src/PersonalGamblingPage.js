import React from "react";

class PersonalGamblingPage extends React.Component {

    state = {
        roundTeams : [],
        chooses: [],
    }

    TEAM1 = 1
    TEAM2 = 2
    DROW = 3

    stateFromLivePage = this.props.stateFromLive;

    render() {
        return (
            <div style={{
                fontSize: 25,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                display: "flex"
            }}>
                <label>Personal Gambling Page</label>
                <div> Your balance: {this.stateFromLivePage.balance}</div>
                <div>
                    {this.stateFromLivePage.team1} VS {this.stateFromLivePage.team2}
                </div>
                <div>
                    Choose:
                    <button onClick={() => this.setState({
                        choose: this.stateFromLivePage.team1,
                    })}>
                        {this.stateFromLivePage.team1} wins
                    </button>
                    <button onClick={() => this.setState({
                        choose: this.stateFromLivePage.team2,
                    })}>
                        {this.stateFromLivePage.team2} wins
                    </button>
                    <button onClick={() => this.setState({
                        choose: "draw",
                    })}>
                        draw
                    </button>
                </div>

            </div>
        )
    }
}

export default PersonalGamblingPage;