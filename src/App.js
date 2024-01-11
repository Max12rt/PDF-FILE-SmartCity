// App.js
import React, { useEffect, useState } from "react";
import Map from "./component/Map";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    const [coords, setCoords] = useState({
        latitude: 39.7837304,
        longitude: -100.4458825
    });
    const [display_name, setName] = useState("");
    const [waypoints, setWaypoints] = useState([]);
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        postalcode: "",
        country: ""
    });
    const [placeName, setPlaceName] = useState(""); // New state for place name

    function error() {
        alert('Sorry, no position available.');
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    async function getCurrentCityName(position) {
        setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
                }
            });
            const data = await response.json();
            setName(data.display_name);
        } catch (error) {
            console.error("Error fetching city name:", error);
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            getCurrentCityName,
            error,
            options
        );
    }, []);

    function update(field) {
        return (e) => {
            const value = e.currentTarget.value;
            setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
        };
    }

    function handlePlaceNameChange(e) {
        setPlaceName(e.currentTarget.value);
    }

    async function submitHandler(e) {
        e.preventDefault();
        console.log(address);

        let url = `https://nominatim.openstreetmap.org/search?city=${address.city}&format=json`;

        try {
            const response = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
                }
            });

            if (response.ok) {
                const data = await response.json();

                if (data && data.length > 0) {
                    setName(data[0].display_name);
                    setCoords({
                        latitude: data[0].lat,
                        longitude: data[0].lon
                    });

                    setWaypoints([
                        ...waypoints,
                        [data[0].lat, data[0].lon]
                    ]);
                } else {
                    alert("No results found for the entered town.");
                }
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error("Error in search:", error);
            alert("Error in search; unable to find the position");
        }
    }
    function getPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    const handleMarkerClick = async (markerLat, markerLng) => {
        try {
            if (waypoints.length === 0) {
                let position = await getPosition();
                let userCoordinates = [position.coords.latitude, position.coords.longitude];

                if (userCoordinates) {
                    setWaypoints([userCoordinates]);
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

    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Smart City</h2>
                                <form onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label>Street:</label>
                                        <input
                                            value={address.city}
                                            placeholder="town"
                                            onChange={update("city")}
                                            id="city"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Search</button>
                                    <div className="mb-3">
                                        <label>Place Name:</label>
                                        <input
                                            value={placeName}
                                            placeholder="Enter place name"
                                            onChange={handlePlaceNameChange}
                                            id="placeName"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                </br>
                <Map coords={coords} display_name={display_name} placeName={placeName} onMarkerClick={handleMarkerClick} />
            </div>
        </React.Fragment>
    );
}
