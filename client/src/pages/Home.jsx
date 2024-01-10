import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const mapStyles = {
    width: '100%',
    height: '100vh', // Adjusted to 100vh to fill the entire viewport height
};

class Home extends Component {
    render() {
        return (
            <MapContainer
                center={[52.0, 19.0]}  // Centered on Poland
                zoom={6}               // Zoom level adjusted for better view of Poland
                style={mapStyles}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        );
    }
}

export default Home;
