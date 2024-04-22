// import React from "react";
//
// class GamblingPage extends React.Component {
//
//     state = {
//         bets: [],
//     }
//
//     stateFromLoginPage = this.props.stateFromLogin;
//
//     componentDidMount() {
//
//     }
//
//     betsList = () => {
//         const event = new EventSource("http://localhost:9123/streaming");
//         event.onopen = function () {
//             console.log('connection is opened. ' + event.readyState)
//         };
//         let context = this;
//         event.onmessage = function (message) {
//             const update = JSON.parse(message.data);
//             context.setState({
//                 bets: update.bets,
//             })
//         };
//     }
//
//     render() {
//         return (
//             <div>
//                 <label> Personal Gambling </label>
//                 <div>
//                     <table style={{width: 575}}>
//                         <thead>
//                         <tr>
//                             <td>Home</td>
//                             <td>Away</td>
//                             <td>result</td>
//                             <td>amount</td>
//                         </tr>
//                         </thead>
//                         {this.state.bets.map((betsList, Index) => (
//                             <tbody>
//                             {this.stateFromLoginPage.secret.equals(betsList.user.secret) ?
//                                 <tr key={Index}>
//                                     <td>{betsList.matchup.team1}</td>
//                                     <td>{betsList.matchup.team2}</td>
//                                     <td>{betsList.result}</td>
//                                     <td>{betsList.result}</td>
//                                 </tr>
//                                 :
//                                 <tr>
//                                 </tr>
//                             }
//                             </tbody>
//                         ))}
//                     </table>
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default GamblingPage;