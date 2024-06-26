import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {FaRegUser} from "react-icons/fa";
import {MdEmail, MdNumbers, MdPassword} from "react-icons/md";

class EditProfilePage extends React.Component {

    state = {
        newUsername: "",
        newPassword: "",
        repeatNewPassword: "",
        errorCode: null,
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
            },
            (response) => {
                if (response.data.success) {
                    console.log("The new details have been successfully saved");
                }
                this.setState({errorCode: response.data.errorCode})
            })
    }

    showErrorCode = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 1:
                errorMessage = "User name taken";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 14:
                errorMessage = "The password must contain @ or !";
                break;
            case 10:
                errorMessage = "Password length should be at least 8 characters";
                break;
            case 12:
                errorMessage = "Password is not the same";
                break;
            case -1:
                errorMessage = "The new details have been successfully saved";
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
            <div>
                <button onClick={this.props.changeEdit}>Go Back</button>
                <div className={"DSignUp"}>
                    <label> Edit Profile </label>
                    <div>
                        <div>
                            <input type="text"
                                   readOnly value={this.stateFromLoginPage.email}
                                   style={{backgroundColor: 'rgba(193,193,193,0.8)'}}/>
                            <MdEmail className="icon"/>
                        </div>
                        <div>
                            <input type="text" readOnly value={this.stateFromLoginPage.username}
                                   style={{backgroundColor: 'rgba(193,193,193,0.8)'}}/>
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
                            <input type="text" readOnly value={this.stateFromLoginPage.password}
                                   style={{backgroundColor: 'rgba(193,193,193,0.8)'}}/>
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
                        <div>
                            <input type="number" readOnly value={this.stateFromLoginPage.balance}
                                   style={{backgroundColor: 'rgba(193,193,193,0.8)'}}/>
                            <MdNumbers className={"icon"}/>
                        </div>

                        <button onClick={this.edit}>submit</button>
                    </div>
                    <div>
                        {this.showErrorCode()}
                    </div>
                </div>
            </div>

        )
    }
}

export default EditProfilePage;