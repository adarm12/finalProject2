import React from "react";
import LeagueTable from "./LeagueTable";
import GamblingPage from "./GamblingPage";
import LiveDashboard from "./LiveDashboard";

class GuestPage extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td className="Pages">
                            <LeagueTable></LeagueTable>
                            <GamblingPage></GamblingPage>
                            <LiveDashboard></LiveDashboard>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default GuestPage;