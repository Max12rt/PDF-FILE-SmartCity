// App.js
import React, { useEffect, useState } from "react";
import Map from "./component/Map";
import "./styles.css";

export default function App() {
    const [coords, setCoords] = useState({
        latitude: 39.7837304,
        longitude: -100.4458825
    });
    const [display_name, setName] = useState("");
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

    function submitHandler(e) {
        e.preventDefault();
        console.log(address);

        let url = `https://nominatim.openstreetmap.org/search?street=${address.street}&city=${address.city}&state=${address.state}&country=${address.country}&postalcode=${address.postalcode}&format=json`;

        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((data) => {
                setName(data[0].display_name);
                setCoords({
                    latitude: data[0].lat,
                    longitude: data[0].lon
                });
            })
            .catch((error) => {
                alert("Error in your input; unable to find the position");
            });
    }

    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
            <div className="App">
                <h1>Enter The address</h1>
                <section className="form-container">
                    <form>
                        <label>street:</label>
                        <input
                            value={address.street}
                            placeholder="1234 abc street"
                            onChange={update("street")}
                            id="street"
                            type="text"
                        />
                        {/* ... (rest of the form inputs) */}
                        <label>Place Name:</label>
                        <input
                            value={placeName}
                            placeholder="Enter place name"
                            onChange={handlePlaceNameChange}
                            id="placeName"
                            type="text"
                        />
                        <button onClick={(e) => submitHandler(e)}>Search</button>
                    </form>
                </section>
                <Map coords={coords} display_name={display_name} placeName={placeName} />
            </div>
        </React.Fragment>
    );
}
