import React from "react";
import LiveDashboard from "./LiveDashboard";
import LeagueTable from "./LeagueTable";

class GuestPage extends React.Component {
    state = {
        showButtons: true,
        live: false,
        leagueTable: false,
    }

    componentDidMount() {

    }

    changeTable = () => {
        this.setState({
            leagueTable: !this.state.leagueTable,
            showButtons: !this.state.showButtons,
        })
    }

    render() {
        return (
            <div>
                {this.state.showButtons ?
                    <div>
                        <button onClick={this.props.changeGuest}>Go Back</button>
                        <div className={"DSignUp"}>
                            <label> Guest </label>
                            {/*<div>*/}
                            {/*    <button onClick={() => this.setState({*/}
                            {/*        live: true,*/}
                            {/*        showButtons: false,*/}
                            {/*        title: ""*/}
                            {/*    })}>Live Dashboard*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            <div>
                                <button onClick={() => this.setState({
                                    leagueTable: true,
                                    showButtons: false,
                                    title: ""
                                })}>League Table
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {/*<div>*/}
                        {/*    {this.state.live ?*/}
                        {/*        <LiveDashboard ></LiveDashboard>*/}
                        {/*        :*/}
                        {/*        <div></div>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div>
                            {this.state.leagueTable ?
                                <LeagueTable changeTable={this.changeTable}/>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default GuestPage;