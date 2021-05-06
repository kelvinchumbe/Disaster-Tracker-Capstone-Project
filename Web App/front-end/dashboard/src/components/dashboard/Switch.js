// import React, { Component } from "react";

// class Button extends Component {
//   constructor() {
//     super();
//     this.state = {
//       on: false,
//     };

//     this.postThingsSpeak = this.postThingsSpeak.bind(this);
//   }

//   postThingsSpeak() {
//     const num = this.state.on ? 1 : 0;
//     fetch(
//       "https://api.thingspeak.com/update?api_key=NHDZOPT9S2SLYZNW&field1=" +
//         num,
//       {
//         method: "GET",
//       }
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         if (res !== 0) {
//           this.setState({
//             on: !this.state.on,
//           });
//         }
//       });
//   }

//   render() {
//     const color = this.state.on ? "RED" : "BLUE";

//     return (
//       <div>
//         <button
//           onClick={this.postThingsSpeak}
//           style={{
//             margin: "0",
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "300px",
//             height: "100px",
//             fontSize: "24px",
//             color: "white",
//             background: color,
//           }}
//         >
//           Switch {this.state.on ? "OFF" : "ON"}
//         </button>
//       </div>
//     );
//   }
// }

// export default Button;
