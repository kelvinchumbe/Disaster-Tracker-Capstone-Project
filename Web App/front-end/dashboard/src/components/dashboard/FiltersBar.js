// import React, { Component } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { RangeDatePicker } from "react-google-flight-datepicker";
// import "react-google-flight-datepicker/dist/main.css";

// class FiltersBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       toggleDate: false,
//       toggleTime: false,
//       category: "",
//       start_date: new Date(),
//       end_date: new Date(),
//       start_time: new Date(),
//       end_time: new Date(),
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.formatDate = this.formatDate.bind(this);
//     this.formatTime = this.formatTime.bind(this);
//     this.handleDate = this.handleDate.bind(this);
//   }

//   componentDidMount() {
//     console.log("FILTER MOUNTED");
//   }

//   handleChange(event) {
//     const { name, value } = event.target;

//     this.setState({
//       [name]: value,
//     });
//   }

//   handleDate(dates) {
//     console.log(dates);
//     const [start, end] = dates;

//     this.setState({
//       start_date: start,
//       end_date: end,
//     });
//   }

//   formatDate(date) {
//     if (date !== null) {
//       return new Intl.DateTimeFormat("en-GB", {
//         year: "numeric",
//         month: "short",
//         day: "2-digit",
//       }).format(new Date(Date.parse(date)));
//     }

//     return new Intl.DateTimeFormat("en-GB", {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//     }).format(new Date());
//   }

//   formatTime(datetime) {
//     return new Intl.DateTimeFormat("en-GB", {
//       timeStyle: "short",
//     }).format(new Date(Date.parse(datetime)));
//   }

//   render() {
//     const categories = [
//       "Casualty",
//       "Sympathy and Support",
//       "Caution and Advice",
//       "Damage Report",
//       "Search and Rescue",
//     ];

//     return (
//       <div className="filters-bar">
//         <div className="filter">
//           <div className="filter-input ">
//             <label htmlFor="start_date" className="filter-input-label">
//               Date
//             </label>

//             <div
//               className="filter-date-container"
//               onClick={() =>
//                 this.setState({
//                   toggleDate: !this.state.toggleDate,
//                   toggleTime: false,
//                 })
//               }
//             >
//               {`${this.formatDate(this.state.start_date)} - ${this.formatDate(
//                 this.state.end_date
//               )}`}
//               {/* <i class="icon-chevron-down chevron"></i> */}
//               <img src="../../assets/down-chevron.png" className="chevron" />
//             </div>

//             {this.state.toggleDate ? (
//               <>
//                 <DatePicker
//                   selected={this.state.start_date}
//                   onChange={this.handleDate}
//                   startDate={this.state.start_date}
//                   endDate={this.state.end_date}
//                   selectsRange
//                   inline
//                 />
//               </>
//             ) : (
//               <div></div>
//             )}
//           </div>

//           <div className="filter-input">
//             <label htmlFor="start_time" className="filter-input-label">
//               Time
//             </label>

//             <div
//               className="filter-date-container"
//               onClick={() => {
//                 console.log("CLICKED");
//                 this.setState({
//                   toggleTime: !this.state.toggleTime,
//                   toggleDate: false,
//                 });
//               }}
//             >
//               {`${this.formatTime(this.state.start_time)} - ${this.formatTime(
//                 this.state.end_time
//               )}`}
//               <img src="../../assets/down-chevron.png" className="chevron" />
//             </div>

//             {this.state.toggleTime ? (
//               <>
//                 <DatePicker
//                   selected={this.state.start_time}
//                   dateFormat="h:mm aa"
//                   className="filter-input-time"
//                   name="start_time"
//                   showTimeSelect
//                   showTimeSelectOnly
//                   timeIntervals={15}
//                   timeCaption="Time"
//                   onChange={(start_time) =>
//                     this.setState({ start_time: start_time })
//                   }
//                 />

//                 <DatePicker
//                   selected={this.state.end_time}
//                   dateFormat="h:mm aa"
//                   className="filter-input-time"
//                   name="end_time"
//                   showTimeSelect
//                   showTimeSelectOnly
//                   timeIntervals={15}
//                   timeCaption="Time"
//                   onChange={(end_time) => {
//                     this.setState({
//                       end_time: end_time,
//                     });
//                   }}
//                 />
//               </>
//             ) : (
//               <div></div>
//             )}
//           </div>

//           <div className="filter-input">
//             <label htmlFor="category" className="filter-input-label">
//               Category
//             </label>
//             <div>
//               <select
//                 name="category"
//                 className="filter-field-category"
//                 value={this.state.category}
//                 onChange={this.handleChange}
//                 onFocus={() =>
//                   this.setState({ toggleDate: false, toggleTime: false })
//                 }
//               >
//                 {categories.map((category, i) => {
//                   return (
//                     <option value={category} key={i}>
//                       {category}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default FiltersBar;
