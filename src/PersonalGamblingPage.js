import React from "react";
import {MdPassword} from "react-icons/md";
import {sendApiPostRequest} from "./ApiRequests";
import Cookies from "universal-cookie";

class PersonalGamblingPage extends React.Component {

    state = {
        result: 5,
        userSecret: "",
        matchupId: "",
        balance: "",
        choose: "",
        bet: "",
        errorCode: "",

    }
    stateFromLivePage = this.props.stateFromLive;

    componentDidMount() {
    }

    showErrorCode = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 16:
                errorMessage = "The bet should be higher than zero";
                break;
            case 17:
                errorMessage = "The bet should be lower than zero";
                break;
            case 18:
                errorMessage = "Choose a result for the game";
                break;
            case 19:
                errorMessage = "No matchup";
                break;
            case 20:
                errorMessage = "The round started";
                break;
            case -1:
                errorMessage = "Your bet saved";
                break;
        }
        return errorMessage;
    }

    enterBet = () => {
        sendApiPostRequest("http://localhost:9123/place-bet", {
            user: this.stateFromLivePage.userSecret,
            betSum: this.state.bet,
            matchupId: this.stateFromLivePage.matchupId,
            result: this.state.result
        }, (response) => {
            if (response.data.success) {
                console.log("Your bet saved")
            }
            this.setState({errorCode: response.data.errorCode})
        })
    }


    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
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
                <button onClick={this.props.changeScreen}>Go Back</button>
                <label>Personal Gambling Page</label>
                <div> Your balance: {this.stateFromLivePage.balance}</div>
                <div>
                    {this.stateFromLivePage.team1} VS {this.stateFromLivePage.team2}
                </div>
                <div>
                    Choose:
                    <button onClick={() => this.setState({
                        result: 1,
                    })}>
                        {this.stateFromLivePage.team1} wins
                    </button>
                    <button onClick={() => this.setState({
                        result: 2,
                    })}>
                        {this.stateFromLivePage.team2} wins
                    </button>
                    <button onClick={() => this.setState({
                        result: 0,
                    })}>
                        draw
                    </button>
                </div>
                <div>
                    <input type={"number"}
                           value={this.state.bet}
                           onChange={(event) => this.inputChange("bet", event)}
                           placeholder="Enter your bet"/>
                    <button onClick={this.enterBet}>
                        Bet
                    </button>
                </div>
                <div>
                    {this.showErrorCode()}
                </div>
            </div>
        )
    }
}

export default PersonalGamblingPage;