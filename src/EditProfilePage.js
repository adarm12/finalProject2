import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {FaRegUser} from "react-icons/fa";
import {MdEmail, MdPassword} from "react-icons/md";

class EditProfilePage extends React.Component {

    state = {
        newUsername: "",
        newPassword: "",
        errorCode: null,
        editProfile: false,
        editMessage: "",
    }

    stateFromLoginPage = this.props.stateFromLogin;

    componentDidMount() {
        console.log("State from LoginPage:", this.stateFromLoginPage);
    }

    edit = () => {
        sendApiPostRequest("http://localhost:9123/edit-user", {
            email: this.stateFromLoginPage.email,
            newUsername: this.state.newUsername,
            password: this.stateFromLoginPage.password,
            newPassword: this.state.newPassword,
        }, (response) => {
            if (response.data.success) {
                console.log("הפרטים החדשים נשמרו בהצלחה");
                this.setState({editMessage: "הפרטים החדשים נשמרו בהצלחה"});
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

    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    render() {
        return (
            <div className={"Edit"}>
                <div>
                    {this.state.editMessage !== "הפרטים החדשים נשמרו בהצלחה" ?
                        <div>
                            <div>
                                <input placeholder={this.stateFromLoginPage.email}/>
                                <MdEmail className="icon"/>
                            </div>
                            <div>
                                <input placeholder= {this.stateFromLoginPage.username}/>
                                <FaRegUser className="icon"/>
                            </div>
                            <div>
                                <input type={"text"}
                                       value={this.state.newUsername}
                                       onChange={(event) => this.inputChange("newUsername", event)}
                                       placeholder="הזן שם משתמש חדש"/>
                                <FaRegUser className="icon"/>
                            </div>
                            <div>
                                <input placeholder={this.stateFromLoginPage.password}/>
                                <MdPassword className="icon"/>
                            </div>
                            <div>
                                <input type={"password"}
                                       value={this.state.newPassword}
                                       onChange={(event) => this.inputChange("newPassword", event)}
                                       placeholder="הזן סיסמה חדשה"/>
                                <MdPassword className="icon"/>
                            </div>
                            {this.state.editMessage}
                            <button onClick={this.edit}>submit</button>
                        </div>
                        :
                        <div>
                            {this.state.editMessage}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default EditProfilePage;