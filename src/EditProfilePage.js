import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {FaRegUser} from "react-icons/fa";
import {MdEmail, MdPassword} from "react-icons/md";

class EditProfilePage extends React.Component {

    state = {
        newUsername: "",
        newPassword: "",
        repeatNewPassword: "",
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
            repeatNewPassword: this.state.repeatNewPassword,
        }, (response) => {
            if (response.data.success) {
                console.log("The new details have been successfully saved");
                this.setState({editMessage: "The new details have been successfully saved"});
            } else {
                if (response.data.errorCode === 1)
                    this.setState({editMessage: "User name taken"});
                if (this.state.newPassword === 4)
                    this.setState({editMessage: "No password entered"});
                if (this.state.newUsername === 3)
                    this.setState({editMessage: "No username entered"});
                if (response.data.errorCode === 10)
                    this.setState({editMessage: "Password length should be at least 8 characters"});
                if (response.data.errorCode === 14)
                    this.setState({editMessage: "The password must contain @ or !"});
                if (response.data.errorCode === 12)
                    this.setState({editMessage: "Password is not the same"});
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
            <div className={"DSignUp"}>
                <label> Edit profile </label>
                <div>
                    {this.state.editMessage !== "The new details have been successfully saved" ?
                        <div>
                            <div>
                                <input type="text" readOnly value={this.stateFromLoginPage.email}/>
                                <MdEmail className="icon"/>
                            </div>
                            <div>
                                <input type="text" readOnly value={this.stateFromLoginPage.username}/>
                                <FaRegUser className="icon"/>
                            </div>
                            <div>
                                <input type={"text"}
                                       value={this.state.newUsername}
                                       onChange={(event) => this.inputChange("newUsername", event)}
                                       placeholder="Enter new username"/>
                                <FaRegUser className="icon"/>
                            </div>
                            <div>
                                <input type="text" readOnly value={this.stateFromLoginPage.password}/>
                                <MdPassword className="icon"/>
                            </div>
                            <div>
                                <input type={"password"}
                                       value={this.state.newPassword}
                                       onChange={(event) => this.inputChange("newPassword", event)}
                                       placeholder="Enter new Password"/>
                                <MdPassword className="icon"/>
                            </div>
                            <div>
                                <input type={"password"}
                                       value={this.state.repeatNewPassword}
                                       onChange={(event) => this.inputChange("repeatNewPassword", event)}
                                       placeholder="Repeat password"/>
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