import React from "react";
import axios from "axios";

class SuperAdmin extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        axios.get("http://localhost:9124/get-users").then(response => {
            this.setState({
                users: response.data
            })
        })
    }

    render() {
        return (
            <div>{
                this.state.users.map(item => {
                    return (
                        <div>
                            <span>{item.username}</span>
                            <button>Login As</button>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

export default SuperAdmin;