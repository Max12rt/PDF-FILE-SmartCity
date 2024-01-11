// Map.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../images/user.jpg";
import L from "leaflet";
import MevoParking from "../mevoParking";
import TierParking from "../tierParking";

export default function Map({ coords, display_name, placeName }) {
    const [pointsOfInterest, setPointsOfInterest] = useState([]);

    const { latitude, longitude } = coords;
    // let lat = coords.latitude;
    // let lng = coords.longitude;

    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 35],
        iconAnchor: [5, 30]
    });

    useEffect(() => {
        async function getPointsOfInterest() {
            try {
                const response = await fetch(
                    `http://overpass-api.de/api/interpreter?data=node[amenity=${placeName}](around:10000,${latitude},${longitude});out;`
                );
                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");

                let nodesInfo = [];
                let nodes = xmlDoc.getElementsByTagName("node");

                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    let nodeId = node.getAttribute('id');
                    let latitude = node.getAttribute('lat');
                    let longitude = node.getAttribute('lon');
                    nodesInfo.push([latitude, longitude]);
                }
                setPointsOfInterest(nodesInfo);
            } catch (error) {
                console.error("Failed to fetch points of interest:", error);
                setPointsOfInterest([]);
            }
        }

        if (placeName) {
            getPointsOfInterest();
        }
    }, [latitude, longitude, placeName]);
    

    function MapView() {
        const map = useMap();
        map.setView([latitude, longitude], map.getZoom());
        return null;
    }

    return (
        <MapContainer
            className="map"
            center={[latitude, longitude]}
            zoom={5}
            scrollWheelZoom={true}
        >

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={customIcon} position={[latitude, longitude]}>
                <Popup>{display_name}</Popup>
            </Marker>

            {pointsOfInterest.map((poi, index) => (
                <Marker key={index} position={poi} /*eventHandlers={{ click: () => handleMarkerClick(poi[0], poi[1]) }}*/ >
                    <Popup>You are GAY</Popup>
                </Marker>
            ))}
            <MevoParking />
            <TierParking /> 
            <MapView />
        </MapContainer>
    );
}
