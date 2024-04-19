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

    bet = () => {
        sendApiPostRequest("http://localhost:9123/place-bet", {
            user: this.stateFromLivePage.userSecret,
            betSum: this.state.bet,
            matchupId: this.stateFromLivePage.matchupId,
            result: this.state.result
        }, (response) => {
            if (response.data.success) {
                console.log("Your bet saved")
                this.setState({errorCode: response.data.errorCode})
            } else
                this.setState({errorCode: response.data.errorCode})
        })
    }

    showErrorCode = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 16:
                errorMessage = "Your bet is too low";
                break;
            case 17:
                errorMessage = "Your bet is too high";
                break;
            case 18:
                errorMessage = "Choose a result for the game";
                break;
            case -1:
                errorMessage = "Your bet saved";
                break;
        }
        return errorMessage;
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
                    <button onClick={this.bet}>
                        Bet
                    </button>
                </div>
                {/*<div>*/}
                {/*    bet: {this.state.bet}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    userSecret: {this.stateFromLivePage.userSecret}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    result: {this.state.result}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    matchupId: {this.stateFromLivePage.matchupId}*/}
                {/*</div>*/}
                <div>
                    {this.showErrorCode()}
                </div>
            </div>
        )
    }
}

export default PersonalGamblingPage;