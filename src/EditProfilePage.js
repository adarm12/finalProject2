import React from "react";

import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import LeagueTable from "./LeagueTable";
import GamblingPage from "./GamblingPage";
import LiveDashboard from "./LiveDashboard";

class EditProfilePage extends React.Component {
    state = {
        newUsername: "",
        newPassword: "",
        errorCode: null,
        connectionMessage: "",
        success: "",
        viewProfile: false,
    }

    componentDidMount() {

    }

    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    edit = (username) => {
        sendApiPostRequest("http://localhost:9124/edit-user", {
            email: this.state.email,
            newUsername: this.state.newUsername,
            password: this.state.password,
            newPassword: this.state.newPassword,
        }, (response) => {
            if (response.data.success) {
                console.log("הפרטים החדשים נשמרו בהצלחה");
                this.setState({success: true});
            } else {
                if (response.data.errorCode === 1)
                    this.setState({editMessage: "שם משתמש תפוס"});
                if (this.state.newPassword === "")
                    this.setState({editMessage: "אין סיסמה"});
                if (this.state.newUsername === "")
                    this.setState({editMessage: "אין שם משתמש"});
            }
        })
    }


    render() {
        return (

            <div>
                <div>
                    proprrrrrr: {this.props.email}
                </div>
                <div>
                    <div>
                        {!this.state.success ?
                            <table>
                                <tr>
                                    <td>
                                        email:
                                    </td>
                                    <td>
                                        {this.props.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        username:
                                    </td>
                                    <td>
                                        {this.props.username}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        new username:
                                    </td>
                                    <td>
                                        <input type={"text"}
                                               value={this.state.newUsername}
                                               onChange={(event) => this.inputChange("newUsername", event)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        password:
                                    </td>
                                    <td>
                                        {this.props.password}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        new password:
                                    </td>
                                    <td>
                                        <input type={"password"}
                                               value={this.state.newPassword}
                                               onChange={(event) => this.inputChange("newPassword", event)}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <button onClick={this.edit}>submit</button>
                                    </td>
                                    <td>
                                        {this.state.success}
                                    </td>
                                </tr>
                            </table>
                            :
                            <div>
                            </div>
                        }
                    </div>
                    }
                </div>
                }
            </div>
        )
    }
}

export default EditProfilePage;
// edit = () => {
//     sendApiPostRequest("http://localhost:9124/edit-user", {
//         email: this.state.email,
//         newUsername: this.state.newUsername,
//         password: this.state.password,
//         newPassword: this.state.newPassword,
//     }, (response) => {
//         if (response.data.success) {
//             console.log("הפרטים החדשים נשמרו בהצלחה");
//             this.setState({editMessage: "הפרטים החדשים נשמרו בהצלחה"});
//         } else {
//             if (response.data.errorCode === 1)
//                 this.setState({editMessage: "שם משתמש תפוס"});
//             if (this.state.newPassword === "")
//                 this.setState({editMessage: "אין סיסמה"});
//             if (this.state.newUsername === "")
//                 this.setState({editMessage: "אין שם משתמש"});
//         }
//     })
// }

// errorMessage = (errorCode, messageToEdit) => {
//     switch (errorCode) {
//         case 11:
//             this.setState({ [messageToEdit]: "סיסמה לא נכונה" });
//             break;
//         case 3:
//             this.setState({ [messageToEdit]: "אין שם משתמש" });
//             break;
//         case 4:
//             this.setState({ [messageToEdit]: "אין סיסמה" });
//             break;
//         case 12:
//             this.setState({ [messageToEdit]: "מייל לא קיים" });
//             break;
//         case 2:
//             this.setState({ [messageToEdit]: "שם משתמש לא קיים" });
//             break;
//         case 7:
//             this.setState({ [messageToEdit]: "אין מייל" });
//             break;
//     }
// }


// render() {
//     return (
//         <div>
//             {this.state.connectionMessage !== "התחברת בהצלחה" ?
//                 <table>
//                     <tr>
//                         <td>
//                             username:
//                         </td>
//                         <td>
//                             <input type="text"
//                                    value={this.state.username}
//                                    onChange={(event) => this.inputChange("username", event)}/>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                             email:
//                         </td>
//                         <td>
//                             <input type="text"
//                                    value={this.state.email}
//                                    onChange={(event) => this.inputChange("email", event)}/>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                             password:
//                         </td>
//                         <td>
//                             <input type={"password"}
//                                    value={this.state.password}
//                                    onChange={(event) => this.inputChange("password", event)}/>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                             <button onClick={this.login}>Login</button>
//                         </td>
//                         <td>
//                             {this.state.connectionMessage}
//                         </td>
//                     </tr>
//                 </table>
//                 :
//                 <div>
//                     {!this.state.editProfile ?
//                         <tr>
//                             <td>
//                                 <button onClick={() => this.setState({editProfile: true})}>edit profile</button>
//                             </td>
//                             <td  className="Pages">
//                                 <LeagueTable></LeagueTable>
//                                 <GamblingPage></GamblingPage>
//                                 <GamblingPage></GamblingPage>
//                                 <LiveDashboard></LiveDashboard>
//                             </td>
//                         </tr>
//                         :
//                         <div>
//                             {this.state.editMessage !== "הפרטים החדשים נשמרו בהצלחה" ?
//                                 <table>
//                                     <tr>
//                                         <td>
//                                             email:
//                                         </td>
//                                         <td>
//                                             {this.state.email}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             username:
//                                         </td>
//                                         <td>
//                                             {this.state.username}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             new username:
//                                         </td>
//                                         <td>
//                                             <input type={"text"}
//                                                    value={this.state.newUsername}
//                                                    onChange={(event) => this.inputChange("newUsername", event)}/>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             password:
//                                         </td>
//                                         <td>
//                                             {this.state.password}
//
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                             new password:
//                                         </td>
//                                         <td>
//                                             <input type={"password"}
//                                                    value={this.state.newPassword}
//                                                    onChange={(event) => this.inputChange("newPassword", event)}/>
//                                         </td>
//                                     </tr>
//
//                                     <tr>
//                                         <td>
//                                             <button onClick={this.edit}>submit</button>
//                                         </td>
//                                         <td>
//                                             {this.state.editMessage}
//                                         </td>
//                                     </tr>
//                                 </table>
//                                 :
//                                 <div>
//                                 </div>
//                             }
//                         </div>
//                     }
//                 </div>
//             }
//         </div>
//     )
// }
// }
//
// export default EditProfilePage;