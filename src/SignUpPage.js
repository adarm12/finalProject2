import React from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import {sendApiPostRequest} from "./ApiRequests";

class SignUpPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
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
        }, (response) => {
            if (response.data.success) {
                console.log("נרשמת בהצלחה");
                this.setState({text: "נרשמת בהצלחה"});
            } else {
                console.log("***********Error");
                if (response.data.errorCode === 3)
                    this.setState({text: "אין שם משתמש"});
                if (response.data.errorCode === 7)
                    this.setState({text: "אין מייל"});
                if (response.data.errorCode === 6)
                    this.setState({text: "מייל לא תקין"});
                if (response.data.errorCode === 4)
                    this.setState({text: "אין סיסמה"});
                if (response.data.errorCode === 12)
                    this.setState({text: "סיסמה לא זהה"});
                if (response.data.errorCode === 10)
                    this.setState({text: "אורך הסיסמה צריך להיות לפחות 8 תווים"});
                if (response.data.errorCode === 14)
                    this.setState({text: "הסיסמה צריכה להכיל לפחות אחד מהתווים @ או !"});
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
            <div className={"DSignup"}>
                <div>
                    <input type="text"
                           value={this.state.username}
                           onChange={(event) => this.inputChange("username", event)}
                           placeholder="הזן שם משתמש"
                    />
                    <FaRegUser className="icon"/>
                </div>
                <div>
                    <input type="text"
                           value={this.state.email}
                           onChange={(event) => this.inputChange("email", event)}
                           placeholder="הזן מייל"
                    />
                    <MdEmail className="icon"/>
                </div>
                <div>
                    <input type={"password"}
                           value={this.state.password}
                           onChange={(event) => this.inputChange("password", event)}
                           placeholder="הזן סיסמא"
                    />
                    <MdPassword className="icon"/>
                </div>
                <div>
                    <input type={"password"}
                           value={this.state.repeatPassword}
                           onChange={(event) => this.inputChange("repeatPassword", event)}
                           placeholder="אימות סיסמא"
                    />
                    <MdPassword className="icon"/>
                </div>
                <button onClick={this.signUp}>Sign Up</button>
                {this.state.text}
            </div>
        )
    }
}

export default SignUpPage;