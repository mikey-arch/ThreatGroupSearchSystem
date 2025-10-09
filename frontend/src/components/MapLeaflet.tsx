// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import Sidebar from "../components/Sidebar";
// import countriesData from "../data/countries.json";
// import Link from "next/link";


// // Fix default Leaflet icon for React
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// L.Icon.Default.mergeOptions({
//   iconUrl,
//   iconRetinaUrl,
//   shadowUrl,
// });

// // Type for API response
// interface CountryFromAPI {
//   country: string;
// }

// // Generate a lookup for country coordinates from JSON
// // Generate a lookup for country coordinates from JSON
// const geoCoords: Record<string, [number, number]> = {};
// countriesData.ref_country_codes.forEach(c => {
//   geoCoords[c.country] = [c.latitude, c.longitude];
// });


// const MapLeaflet = () => {
//   const [threatCountries, setThreatCountries] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await fetch("http://localhost:5001/api/threatgroups/countries");
//         const data: CountryFromAPI[] = await res.json();
//         const countries = data.map(c => c.country);
//         console.log("Threat group countries:", countries); // DEBUG
//         setThreatCountries(countries);
//       } catch (err) {
//         console.error("Failed to fetch countries", err);
//       }
//     };
//     fetchCountries();
//   }, []);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="sticky top-0 h-screen">
//         <Sidebar />
//       </div>

//       {/* Map */}
//       <main className="flex-1 p-8 max-w-6xl mx-auto" data-theme="nord">
//         <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
//           <h1 className="text-4xl font-bold text-center">Map</h1>
//         </div>

//         <div className="mt-4">
//           <MapContainer center={[20, 0]} zoom={2} style={{ height: "80vh", width: "100%" }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; OpenStreetMap contributors"
//             />

//             {threatCountries
//               .filter(country => country !== "Unknown")
//               .map((country) => {
//                 const coords = geoCoords[country];
//                 if (!coords) return null;

//                 return (
                
//                     <CircleMarker
//                     key={country}
//                     center={coords}
//                     radius={8}
//                     color="#f2b632"
//                     fillOpacity={0.8}
//                     >
//                     <Popup>
//                         <Link href={`/country/${encodeURIComponent(country)}`}>
//                         <a>
//                             <strong>{country}</strong>
//                             <br />
//                             View Threat Groups
//                         </a>
//                         </Link>
//                     </Popup>
//                     </CircleMarker>
//                 );

                
//               })}
//           </MapContainer>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MapLeaflet;

import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Sidebar from "../components/Sidebar";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default icon for Leaflet in React
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

interface CountryFromAPI {
  country: string;
}

// Hard-coded coordinates for demonstration; add more as needed
const geoCoords: Record<string, [number, number]> = {
  "China": [35.8617, 104.1954],
  "North Korea": [40.3399, 127.5101],
  "South Korea": [37.5665, 126.9780],
  "Russia": [61.5240, 105.3188],
  "Australia": [-25.2744, 133.7751],
  "India": [20.5937, 78.9629],
  "Pakistan": [30.3753, 69.3451],
  "Iran": [32.4279, 53.6880],
  "United States": [37.0902, -95.7129],
  "Israel": [31.0461, 34.8516],
  "Palestine": [31.9522, 35.2332],
  "United Kingdom": [55.3781, -3.4360],
  "France": [46.2276, 2.2137],
  "Germany": [51.1657, 10.4515],
  "Japan": [36.2048, 138.2529],
  "Brazil": [-14.2350, -51.9253],
  "Turkey": [38.9637, 35.2433],
  "Saudi Arabia": [23.8859, 45.0792],
  "United Arab Emirates": [23.4241, 53.8478],
  "Vietnam": [14.0583, 108.2772],
  "Syria": [34.8021, 38.9968],
  "Ukraine": [48.3794, 31.1656],
  "Belarus": [53.7098, 27.9534],
  "Kazakhstan": [48.0196, 66.9237],
  "Netherlands": [52.1326, 5.2913],
  "Switzerland": [46.8182, 8.2275],
  "Sweden": [60.1282, 18.6435],
  "Norway": [60.4720, 8.4689],
  "Denmark": [56.2639, 9.5018],
  "Finland": [61.9241, 25.7482],
  "Poland": [51.9194, 19.1451],
  "Canada": [56.1304, -106.3468],
  "Mexico": [23.6345, -102.5528],
  "New Zealand": [-40.9006, 174.8860],
  "Singapore": [1.3521, 103.8198],
  "Malaysia": [4.2105, 101.9758],
  "Indonesia": [-0.7893, 113.9213],
  "Thailand": [15.8700, 100.9925],
  "Philippines": [12.8797, 121.7740],
  "Egypt": [26.8206, 30.8025],
  "South Africa": [-30.5595, 22.9375],
  "Nigeria": [9.0820, 8.6753],
  "Unknown": [0, 0],
};

const MapLeaflet = () => {
  //const router = useRouter();
  const [threatCountries, setThreatCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/threatgroups/countries");
        const data: CountryFromAPI[] = await res.json();
        const countries = data.map(c => c.country);
        console.log("Threat group countries:", countries);
        setThreatCountries(countries);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Map */}
      <main className="flex-1 p-8 max-w-6xl mx-auto" data-theme="nord">
        <div className="sticky top-0 z-20 bg-base-200 py-6 shadow-md">
          <h1 className="text-4xl font-bold text-center">Map</h1>
        </div>

        <div className="mt-4">
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "80vh", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {threatCountries
  .filter(country => country !== "Unknown") // skip unknowns
  .map((country) => {
    const coords = geoCoords[country];
    if (!coords) return null;

    return (
      <CircleMarker
        key={country}
        center={coords}
        radius={8}
        color="#f2b632"
        fillOpacity={0.8}
        eventHandlers={{
  click: () => {
    const url = `/threats/${encodeURIComponent(country)}`;
    window.location.href = url;
  }
}}

      >
        <Popup>
          <strong>{country}</strong>
          <br />
          Threat group present
        </Popup>
      </CircleMarker>
    );
  })}

          </MapContainer>
        </div>
      </main>
    </div>
  );
};

export default MapLeaflet;

