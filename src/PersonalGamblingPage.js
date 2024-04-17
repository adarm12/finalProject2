import React from "react";
import {MdPassword} from "react-icons/md";

class PersonalGamblingPage extends React.Component {

    state = {
        newBet: {
            pick: "",
            money: "",
            ratio: "",
        },
        result: "",
        balance: "",
        choose: "",
        bet: "",
        error: "",

    }

    stateFromLivePage = this.props.stateFromLive;

    componentDidMount() {
        this.setState({balance: this.stateFromLivePage.balance})
        this.check()
    }

    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }


    check = () => {
        if (this.stateFromLivePage.team1Goals > this.stateFromLivePage.team2Goals) {
            this.setState({result: this.stateFromLivePage.team1});
        }
        if (this.stateFromLivePage.team1Goals < this.stateFromLivePage.team2Goals) {
            this.setState({result: this.stateFromLivePage.team2});
        }
        if (this.stateFromLivePage.team1Goals === this.stateFromLivePage.team2Goals) {
            this.setState({result: "draw"});
        }
    }

    updateBet = (field, value) => {
        this.setState({
            newBet: {
                ...this.state.newBet,
                [field]: value,
            }
        });
    }

    bet = () => {
        this.updateBet("pick", this.state.choose)
        this.updateBet("money", this.state.bet)
        this.updateBet("ratio", this.stateFromLivePage.drawRatio)
        if (this.state.bet > this.state.balance)
            this.setState({error: "The bet must be lower than the balance"})
        if (this.state.bet < 0)
            this.setState({error: "The bet must be higher than the 0"})
        if (this.state.bet < this.state.balance && this.state.bet > 0) {
            if (this.state.result === this.stateFromLivePage.team1 && this.state.choose === this.stateFromLivePage.team1) {
                this.setState({balance: (this.state.balance - this.state.bet) + (this.state.bet * this.stateFromLivePage.team1WinRatio)})
            } else if (this.state.result === this.stateFromLivePage.team2 && this.state.choose === this.stateFromLivePage.team2) {
                this.setState({balance: (this.state.balance - this.state.bet) + (this.state.bet * this.stateFromLivePage.team2WinRatio)})
            } else if (this.state.result === "draw" && this.state.choose === "draw") {
                this.setState({balance: (this.state.balance - this.state.bet) + (this.state.bet * this.stateFromLivePage.drawRatio)})
            } else {
                this.setState({balance: this.state.balance - this.state.bet})
            }
        }

    }


render()
{
    return (
        <div style={{
            fontSize: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            display: "flex"
        }}>
            <label>Personal Gambling Page</label>
            <div> Your balance: {this.state.balance}</div>
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
                <input type={"number"}
                       value={this.state.bet}
                       onChange={(event) => this.inputChange("bet", event)}
                       placeholder="Enter your bet"/>
                <button onClick={this.bet}>
                    Bet
                </button>
            </div>
            <div>
                bet: {this.state.bet}
            </div>
            <div>
                choose: {this.state.choose}
            </div>
            <div>
                result: {this.state.result}
            </div>
            <div>
                newBet: {this.state.newBet.pick}
            </div>
            {this.stateFromLivePage.team1} {this.stateFromLivePage.team2}
            {this.stateFromLivePage.team1Goals} {this.stateFromLivePage.team2Goals}
            <div>
                Error: {this.state.error}
            </div>
        </div>
    )
}
}

export default PersonalGamblingPage;