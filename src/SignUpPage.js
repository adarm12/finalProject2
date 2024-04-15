import React from "react";
import {MdEmail, MdNumbers, MdPassword} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {sendApiPostRequest} from "./ApiRequests";

class SignUpPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        balance: 0,
        text: ""
    }

    componentDidMount() {

    }

    signUp = () => {
        sendApiPostRequest("http://localhost:9123/sign-up", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword,
            balance: this.state.balance,
        }, (response) => {
            if (response.data.success) {
                console.log("You have successfully signed up");
                this.setState({text: "You have successfully signed up"});
            } else {
                console.log("***********Error");
                if (response.data.errorCode === 3)
                    this.setState({text: "No username entered"});
                if (response.data.errorCode === 7)
                    this.setState({text: "No email entered"});
                if (response.data.errorCode === 6)
                    this.setState({text: "Invalid mail"});
                if (response.data.errorCode === 4)
                    this.setState({text: "No password entered"});
                if (response.data.errorCode === 12)
                    this.setState({text: "Password is not the same"});
                if (response.data.errorCode === 10)
                    this.setState({text: "Password length should be at least 8 characters"});
                if (response.data.errorCode === 14)
                    this.setState({text: "The password must contain @ or !"});
                if (response.data.errorCode === 15)
                    this.setState({text: "The balance should be bigger then 50"});
                // setTimeout(() => {
                //     this.setState({text: ""}); // לאפס את ההודעה לאחר 5 שניות
                // }, 5000);
            }
        })
    }

    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    // isValidEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }
    //
    // samePassword = () => {
    //     return (this.state.password.equals(this.state.repeatPassword));
    // }
    //
    // errorMessage = (data) => {
    //     if (data.errorCode === 3)
    //         this.setState({message: "אין שם משתמש"});
    //     if (data.errorCode === 7)
    //         this.setState({message: "אין מייל"});
    //     if (data.errorCode === 6)
    //         this.setState({message: "מייל לא תקין"});
    //     if (data.errorCode === 4)
    //         this.setState({message: "אין סיסמה"});
    //     setTimeout(() => {
    //         this.setState({text: ""}); // לאפס את ההודעה לאחר 5 שניות
    //     }, 5000);
    // }

    render() {
        return (
            <div className={"DSignUp"}>
                <label> Sign Up </label>
                <div>
                    <input type="text"
                           value={this.state.username}
                           onChange={(event) => this.inputChange("username", event)}
                           placeholder="Enter username"
                    />
                    <FaRegUser className="icon"/>
                </div>
                <div>
                    <input type="text"
                           value={this.state.email}
                           onChange={(event) => this.inputChange("email", event)}
                           placeholder="Enter email"
                    />
                    <MdEmail className="icon"/>
                </div>
                <div>
                    <input type={"password"}
                           value={this.state.password}
                           onChange={(event) => this.inputChange("password", event)}
                           placeholder="Enter password"
                    />
                    <MdPassword className="icon"/>
                </div>
                <div>
                    <input type={"password"}
                           value={this.state.repeatPassword}
                           onChange={(event) => this.inputChange("repeatPassword", event)}
                           placeholder="Repeat password"
                    />
                    <MdPassword className="icon"/>
                </div>
                <div>
                    <input type={"number"}
                           value={this.state.balance}
                           onChange={(event) => this.inputChange("balance", event)}
                           placeholder="Enter balance"
                    />
                    <MdNumbers className={"icon"}/>
                </div>
                <button onClick={this.signUp}>Sign Up</button>
                {this.state.text}
            </div>
        )
    }
}

export default SignUpPage;