import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import icon from "./images/tier.png";

export default function TierParking() {
    const map = useMap();
    const customIconTier = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 25]
    });
    
    const [coords, setCoords] = useState([]);
    
    async function useLoadJSON() {
        try {
            let lat = map.getCenter().lat;
            let lng = map.getCenter().lng;
            let r = map.getZoom() * 1000;
            // console.log(map);
            // console.log(lat);
            // console.log(lng);
            // console.log(r);
            // lat = 52.2297;
            // lng = 18.0122;

            const response = await fetch('http://127.0.0.1:5000/' + lat + '/' + lng +'/'+r);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error("Failed to load Tier parking data:", error);
            return [];
        }
    }

    useEffect(() => {
        async function DisplayTierParking() {
            try {
                const vehicleData = await useLoadJSON();
                if (vehicleData.length === 0) {
                    return;
                }
                setCoords(vehicleData["data"]);
            } catch (error) {
                console.error("Failed to display Tier parking:", error);
            }
        }

        DisplayTierParking();
    }, []);

    console.log(coords.length);
    return coords.map((vehicle) => (
        <Marker position={[vehicle[0], vehicle[1]]} icon={customIconTier}>
            <Popup>{vehicle[2]}<br/>Battery: {vehicle[3]}</Popup>
        </Marker>
    ));
}