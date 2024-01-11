// Map.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../images/icon.png";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine"; 
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Add this line for CSS
import "leaflet-control-geocoder/dist/Control.Geocoder";
import MevoParking from "../mevoParking";

export default function Map({ coords, display_name, placeName }) {
    const [pointsOfInterest, setPointsOfInterest] = useState([]);
    const [waypoints, setWaypoints] = useState([]);
    const { latitude, longitude } = coords;

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
                    console.log(node)
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

    function getPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    const handleMarkerClick = async (markerLat, markerLng) => {
        try {
            if (control.getWaypoints().length === 0) {
                let position = await getPosition();
                var userCoordinates = [position.coords.latitude, position.coords.longitude];
    
                if (userCoordinates) {
                    control.spliceWaypoints(control.getWaypoints().length + 1, 1, e.latlng);
                    console.log("User's Coordinates appended:", userCoordinates);
                } else {
                    console.error("User's coordinates are not available.");
                }
            }
    
            var Point = [markerLat, markerLng];

            if (Point) {
                setWaypoints(prevWaypoints => [...prevWaypoints, Point]);
                console.log("Point's Coordinates appended:", Point);
            } else {
                console.error("Point's coordinates are not available.");
            }
        } catch (error) {
            console.error('Error adding waypoint:', error);
        }
    };

    

    function MapView() {
        const map = useMap();

        L.Routing.control({
            waypoints: [],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim()
        }).addTo(map);

        console.log("Number of points: ", control.getWaypoints().length);

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
                <Marker key={index} position={poi} eventHandlers={{ click: () => handleMarkerClick(poi[0], poi[1]) }}>
                    <Popup>Point of Interest</Popup>
                </Marker>
            ))}
            
            <MevoParking />
            <MapView />
        </MapContainer>
    );
    /*
    {
                console.log(MevoParking())

            }*/
}