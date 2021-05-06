// import React, { useState, useRef } from "react";
// import useSwr from "swr";
// import GoogleMapReact from "google-map-react";
// import useSupercluster from "use-supercluster";

// const fetcher = (...args) => fetch(...args).then((response) => response.json());

// const Marker = ({ children }) => children;

// export default function App() {
//   const mapRef = useRef();
//   const [bounds, setBounds] = useState(null);
//   const [zoom, setZoom] = useState(10);


//     const points =  [
//         {
//           geometry: {
//             coordinates: [
//               -121.4947,
//               38.577
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -121.576613,
//               38.43792
//             ],
//             bounding_coord_2: [
//               -121.576613,
//               38.685524
//             ],
//             bounding_coord_3: [
//               -121.362715,
//               38.685524
//             ],
//             bounding_coord_4: [
//               -121.362715,
//               38.43792
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:46:29 +0000 2021',
//             hashtags: [
//               '#sacramento'
//             ],
//             place_name: 'Sacramento, CA',
//             tweet_id: 1379067925605314600,
//             tweet_text: 'We coming AZ, but now we have to hit SAC Town California #sacramento stream both singles!! Let’s get it this weeken… https://t.co/BMZgQcJNek',
//             user_location: 'Phoenix, AZ',
//             user_screen_name: 'RocMGT'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -121.4947,
//               38.577
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -121.576613,
//               38.43792
//             ],
//             bounding_coord_2: [
//               -121.576613,
//               38.685524
//             ],
//             bounding_coord_3: [
//               -121.362715,
//               38.685524
//             ],
//             bounding_coord_4: [
//               -121.362715,
//               38.43792
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:46:29 +0000 2021',
//             hashtags: [
//               '#sacramento'
//             ],
//             place_name: 'Sacramento, CA',
//             tweet_id: 1379067925605314600,
//             tweet_text: 'We coming AZ, but now we have to hit SAC Town California #sacramento stream both singles!! Let’s get it this weeken… https://t.co/BMZgQcJNek',
//             user_location: 'Phoenix, AZ',
//             user_screen_name: 'RocMGT'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -95.91719055,
//               36.03730583
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -96.065628,
//               35.968624
//             ],
//             bounding_coord_2: [
//               -96.065628,
//               36.250159
//             ],
//             bounding_coord_3: [
//               -95.761656,
//               36.250159
//             ],
//             bounding_coord_4: [
//               -95.761656,
//               35.968624
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:46:37 +0000 2021',
//             hashtags: [],
//             place_name: 'Tulsa, OK',
//             tweet_id: 1379067955951075300,
//             tweet_text: 'Just posted a photo @ Southern Pointe, Tulsa, Oklahoma https://t.co/jcMmW9GNWY',
//             user_location: '539',
//             user_screen_name: 'Trae3III'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -95.91719055,
//               36.03730583
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -96.065628,
//               35.968624
//             ],
//             bounding_coord_2: [
//               -96.065628,
//               36.250159
//             ],
//             bounding_coord_3: [
//               -95.761656,
//               36.250159
//             ],
//             bounding_coord_4: [
//               -95.761656,
//               35.968624
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:46:37 +0000 2021',
//             hashtags: [],
//             place_name: 'Tulsa, OK',
//             tweet_id: 1379067955951075300,
//             tweet_text: 'Just posted a photo @ Southern Pointe, Tulsa, Oklahoma https://t.co/jcMmW9GNWY',
//             user_location: '539',
//             user_screen_name: 'Trae3III'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -76.15,
//               35.41
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -84.321948,
//               33.752879
//             ],
//             bounding_coord_2: [
//               -84.321948,
//               36.588118
//             ],
//             bounding_coord_3: [
//               -75.40012,
//               36.588118
//             ],
//             bounding_coord_4: [
//               -75.40012,
//               33.752879
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:46:44 +0000 2021',
//             hashtags: [
//               '#easterweekend'
//             ],
//             place_name: 'North Carolina, USA',
//             tweet_id: 1379067987492151300,
//             tweet_text: 'Saturday sunsets over Mattamuskeet Lake #easterweekend @ Hyde County, North Carolina https://t.co/l2aZyaAcRY',
//             user_location: 'North Carolina, USA',
//             user_screen_name: 'AlexSimmonsRTP'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -76.15,
//               35.41
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -84.321948,
//               33.752879
//             ],
//             bounding_coord_2: [
//               -84.321948,
//               36.588118
//             ],
//             bounding_coord_3: [
//               -75.40012,
//               36.588118
//             ],
//             bounding_coord_4: [
//               -75.40012,
//               33.752879
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:46:44 +0000 2021',
//             hashtags: [
//               '#easterweekend'
//             ],
//             place_name: 'North Carolina, USA',
//             tweet_id: 1379067987492151300,
//             tweet_text: 'Saturday sunsets over Mattamuskeet Lake #easterweekend @ Hyde County, North Carolina https://t.co/l2aZyaAcRY',
//             user_location: 'North Carolina, USA',
//             user_screen_name: 'AlexSimmonsRTP'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -78.790484,
//               42.849892
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -78.801819,
//               42.803843
//             ],
//             bounding_coord_2: [
//               -78.801819,
//               42.874972
//             ],
//             bounding_coord_3: [
//               -78.696854,
//               42.874972
//             ],
//             bounding_coord_4: [
//               -78.696854,
//               42.803843
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:47:17 +0000 2021',
//             hashtags: [
//               '#I90NYSThruway'
//             ],
//             place_name: 'West Seneca, NY',
//             tweet_id: 1379068126374027300,
//             tweet_text: 'Incident on #I90NYSThruway WB at Before Exit 54 (I-90) - West Seneca (Rte 16) https://t.co/OZC6DEWqh8',
//             user_location: 'Buffalo',
//             user_screen_name: '511nyWNY'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -78.790484,
//               42.849892
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -78.801819,
//               42.803843
//             ],
//             bounding_coord_2: [
//               -78.801819,
//               42.874972
//             ],
//             bounding_coord_3: [
//               -78.696854,
//               42.874972
//             ],
//             bounding_coord_4: [
//               -78.696854,
//               42.803843
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:47:17 +0000 2021',
//             hashtags: [
//               '#I90NYSThruway'
//             ],
//             place_name: 'West Seneca, NY',
//             tweet_id: 1379068126374027300,
//             tweet_text: 'Incident on #I90NYSThruway WB at Before Exit 54 (I-90) - West Seneca (Rte 16) https://t.co/OZC6DEWqh8',
//             user_location: 'Buffalo',
//             user_screen_name: '511nyWNY'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -73.5335,
//               40.7852
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -73.572945,
//               40.771556
//             ],
//             bounding_coord_2: [
//               -73.572945,
//               40.803164
//             ],
//             bounding_coord_3: [
//               -73.515075,
//               40.803164
//             ],
//             bounding_coord_4: [
//               -73.515075,
//               40.771556
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:47:18 +0000 2021',
//             hashtags: [
//               '#I495'
//             ],
//             place_name: 'Jericho, NY',
//             tweet_id: 1379068128513171500,
//             tweet_text: 'Updated: Incident on #I495 EB at Exit 41N - NY 106/107; North Broadway/Jerusalem Avenue https://t.co/EXFVYcOiO4',
//             user_location: 'Long Island',
//             user_screen_name: '511nyLongIsland'
//           },
//           type: 'Feature'
//         },
//         {
//           geometry: {
//             coordinates: [
//               -73.5335,
//               40.7852
//             ],
//             type: 'Point'
//           },
//           properties: {
//             bounding_coord_1: [
//               -73.572945,
//               40.771556
//             ],
//             bounding_coord_2: [
//               -73.572945,
//               40.803164
//             ],
//             bounding_coord_3: [
//               -73.515075,
//               40.803164
//             ],
//             bounding_coord_4: [
//               -73.515075,
//               40.771556
//             ],
//             category: 'Sympathy and Support',
//             cluster: false,
//             created_at: 'Mon Apr 05 13:47:18 +0000 2021',
//             hashtags: [
//               '#I495'
//             ],
//             place_name: 'Jericho, NY',
//             tweet_id: 1379068128513171500,
//             tweet_text: 'Updated: Incident on #I495 EB at Exit 41N - NY 106/107; North Broadway/Jerusalem Avenue https://t.co/EXFVYcOiO4',
//             user_location: 'Long Island',
//             user_screen_name: '511nyLongIsland'
//           },
//           type: 'Feature'
//         }
//       ]

//   console.log("POINTS", points);

//   const { clusters, supercluster } = useSupercluster({
//     points,
//     bounds,
//     zoom,
//     options: { radius: 75, maxZoom: 20 },
//   });

//   console.log("CLUSTERS", clusters);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyAAxSzIwtZ3XIdx19xhTk8AnCvSVSMOH_8" }}
//         defaultCenter={{ lat: 52.6376, lng: -1.135171 }}
//         defaultZoom={10}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map }) => {
//           mapRef.current = map;
//         }}
//         onChange={({ zoom, bounds }) => {
//           setZoom(zoom);
//           setBounds([
//             bounds.nw.lng,
//             bounds.se.lat,
//             bounds.se.lng,
//             bounds.nw.lat,
//           ]);
//         }}
//       >
//         {clusters.map((cluster) => {
//           const [longitude, latitude] = cluster.geometry.coordinates;
//           const {
//             cluster: isCluster,
//             point_count: pointCount,
//           } = cluster.properties;

//           if (isCluster) {
//             return (
//               <Marker
//                 key={`cluster-${cluster.id}`}
//                 lat={latitude}
//                 lng={longitude}
//               >
//                 <div
//                   className="cluster-marker"
//                   style={{
//                     width: `${10 + (pointCount / points.length) * 20}px`,
//                     height: `${10 + (pointCount / points.length) * 20}px`,
//                   }}
//                   onClick={() => {
//                     const expansionZoom = Math.min(
//                       supercluster.getClusterExpansionZoom(cluster.id),
//                       20
//                     );
//                     mapRef.current.setZoom(expansionZoom);
//                     mapRef.current.panTo({ lat: latitude, lng: longitude });
//                   }}
//                 >
//                   {pointCount}
//                 </div>
//               </Marker>
//             );
//           }

//           return (
//             <Marker
//               key={`crime-${cluster.properties.crimeId}`}
//               lat={latitude}
//               lng={longitude}
//             >
//               <button className="crime-marker">
//                 <img src="/custody.svg" alt="crime doesn't pay" />
//               </button>
//             </Marker>
//           );
//         })}
//       </GoogleMapReact>
//     </div>
//   );
// }
