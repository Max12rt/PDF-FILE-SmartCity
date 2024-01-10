// ParkingPlaces.js
import React, { useEffect } from "react";
import L from "leaflet";
import icon from "../images/icon.png";

export default function ParkingPlaces({ userCoordinates }) {
    const SEARCH_RADIUS = 5000; // 5 km

    async function getParkingInRadius(latitude, longitude, radius) {
        const overpassUrl = `http://overpass-api.de/api/interpreter?data=node[amenity=bar](around:${radius},${latitude},${longitude});out;`;
        try {
            const response = await fetch(overpassUrl);
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
            console.log(nodesInfo);
            return nodesInfo;
        } catch (error) {
            console.error("Failed to fetch parking data:", error);
            return [];
        }
    }

    useEffect(() => {
        async function fetchParkingPlaces() {
            try {
                const parkingData = await getParkingInRadius(userCoordinates[0], userCoordinates[1]);

                // Create a map and set its view
                const map = L.map("map").setView(userCoordinates, 13);

                // Add a tile layer to the map
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                }).addTo(map);

                // Add a marker for each parking node
                for (let parkingNode of parkingData) {
                    L.marker([parkingNode[0], parkingNode[1]]).addTo(map);
                }

                // Create a custom icon for the user's location
                const customIcon = L.icon({
                    iconUrl: icon,
                    iconSize: [50, 50],
                });

                // Options for the marker
                const markerOptions = {
                    title: "My Location",
                    clickable: true,
                    draggable: true,
                    icon: customIcon,
                };

                // Create a marker for the user's location
                L.marker(userCoordinates, markerOptions).addTo(map);
            } catch (error) {
                console.error("Failed to fetch and display parking places:", error);
            }
        }

        fetchParkingPlaces();
    }, [userCoordinates]);

    return null;
}
