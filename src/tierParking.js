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
            // let lat = 52.2297;
            // let lng = 21.0122;
            // let r = 1000;

            const response = await fetch('https://platform.tier-services.io/v1/vehicle?lat=' + lat + '&lng=' + lng +'&radius='+r, {
                headers: {'X-Api-Key': 'bpEUTJEBTf74oGRWxaIcW7aeZMzDDODe1yBoSxi2'},
            });
            // console.log(response);
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
                setCoords(vehicleData["data"]);
            } catch (error) {
                console.error("Failed to display Tier parking:", error);
            }
        }

        DisplayTierParking();
    }, []);

    console.log(coords);
    return coords.map((vehicle) => (
        <Marker key={vehicle.id} position={[vehicle.attributes.lat, vehicle.attributes.lng]} icon={customIconTier}>
            <Popup>{vehicle.attributes.licencePlate}</Popup>
        </Marker>
    ));
}