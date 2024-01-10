import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "./images/mevo.png";

export default function MevoParking() {

    const customIconMevo = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 25]
    });

    const [coords, setCoords] = useState([]);

    async function loadJSON() {
        try {
            const response = await fetch('https://gbfs.urbansharing.com/rowermevo.pl/station_information.json');
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error("Failed to load Mevo parking data:", error);
            return [];
        }
    }

    useEffect(() => {
        async function displayMevoParking() {
            try {
                const coordsOfMevo = await loadJSON();
                setCoords(coordsOfMevo["data"]["stations"]);
            } catch (error) {
                console.error("Failed to display Mevo parking:", error);
            }
        }

        displayMevoParking();
    }, []);

    return coords.map((mevo) => (
        <Marker key={mevo.station_id} position={[mevo.lat, mevo.lon]} icon={customIconMevo}>
            <Popup>{mevo.name}</Popup>
        </Marker>
    ));
}