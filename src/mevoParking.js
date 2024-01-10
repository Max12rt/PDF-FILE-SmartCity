// MevoParking.js
import React, { useEffect } from "react";
import L from "leaflet";

export default function MevoParking({ map }) {
    const iconOptionsMevo = {
        iconUrl: 'mevo_park.png',
        iconSize: [32, 25]
    };

    // Creating a custom icon for Mevo parking
    const customIconMevo = new L.Icon(iconOptionsMevo);

    const markerOptionsMevo = {
        title: "mevo_park",
        clickable: true,
        icon: customIconMevo
    };

    async function loadJSON() {
        try {
            const response = await fetch('coordinates_mevo.json');
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
                for (let mevo of coordsOfMevo) {
                    L.marker([mevo[0], mevo[1]], markerOptionsMevo).addTo(map);
                }
            } catch (error) {
                console.error("Failed to display Mevo parking:", error);
            }
        }

        displayMevoParking();
    }, [map, markerOptionsMevo]);

    return null;
}
