import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import PersonalGamblingPage from "./PersonalGamblingPage";
import LiveDashboard from "./LiveDashboard";
import EditProfilePage from "./EditProfilePage";
import LeagueTable from "./LeagueTable";
import {MdEmail, MdPassword} from "react-icons/md";

class SuccessConnection extends React.Component {
    state = {
        editProfile: false,
        live: false,
        leagueTable: false,
        showButtons: true,
    };

    stateFromLogin = this.props.stateFromLogin;

    render() {
        return (
            <div>
                <div className={"DSignUp"}>
                    {this.state.showButtons ? (
                        <div className={"DSignUp"}>
                            <div>
                                <button
                                    onClick={() =>
                                        this.setState({
                                            live: true,
                                            showButtons: false
                                        })}>Live Dashboard
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        this.setState({
                                            leagueTable: true,
                                            showButtons: false
                                        })}>League Table
                                </button>
                            </div>
                            {(this.stateFromLogin.connectionSuccess) &&
                                <div>
                                    <div>
                                        <button onClick={() => this.setState({
                                            editProfile: true,
                                            showButtons: false,
                                        })}>Edit Profile
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => this.setState({
                                            personalGambling: true,
                                            showButtons: false,
                                        })}>Personal Gambling
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        <div>
                            <div>{this.state.leagueTable && <LeagueTable></LeagueTable>}</div>
                            <div> {this.state.editProfile && <EditProfilePage stateFromLogin={this.state}/>} </div>
                            <div>{this.state.live &&
                                <LiveDashboard stateFromLogin={this.stateFromLogin}></LiveDashboard>}</div>
                            <div>{this.state.personalGambling && <PersonalGamblingPage></PersonalGamblingPage>}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default SuccessConnection;
