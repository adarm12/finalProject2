import React from "react";

class PersonalGamblingPage extends React.Component {

    state = {
        // result: "",
        choose: "",
    }

    stateFromLivePage = this.props.stateFromLive;

    componentDidMount() {
    }




    setBalance = () => {
        if (this.state.result === this.stateFromLivePage.team1Goals) {
            this.setState({result: this.stateFromLivePage.team1})
        }
    }


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

                <div>
                    choose: {this.state.choose}
                </div>
                <div>
                    result: {this.stateFromLivePage.result}
                </div>
                {this.stateFromLivePage.team1} {this.stateFromLivePage.team2}
                {this.stateFromLivePage.team1Goals} {this.stateFromLivePage.team2Goals}
            </div>
        )
    }
}

export default PersonalGamblingPage;