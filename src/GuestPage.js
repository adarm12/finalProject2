import React from "react";
import LiveDashboard from "./LiveDashboard";
import GamblingPage from "./GamblingPage";

class GuestPage extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td className="Pages">
                            <LiveDashboard></LiveDashboard>
                            <GamblingPage></GamblingPage>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default GuestPage;