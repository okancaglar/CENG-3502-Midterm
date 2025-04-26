// components/Map.jsx
'use client'

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

/**
 * Handles click events on the map and calls onSelect
 * with the clicked latitude/longitude.
 */
function ClickHandler({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect({
                latitude: Number(e.latlng.lat.toFixed(6)),
                longitude: Number(e.latlng.lng.toFixed(6))
            })
        }
    })
    return null
}

/**
 * A Leaflet map that starts zoomed in on Turkey.
 * Props:
 *  - landmarks: Array of { latitude, longitude }
 *  - onSelect:  (point) => void
 */
export default function Map({ landmarks, onSelect }) {
    return (
        <MapContainer
            center={[38.9637, 35.2433]}
            zoom={6}
            style={{
                height: '500px',
                width: '100%',
                border: '2px solid black',
                borderRadius: '8px'
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler onSelect={onSelect} />

            {landmarks.map((lm, idx) => (
                <Marker key={idx} position={[lm.latitude, lm.longitude]}>
                    <Popup>
                        Lat: {lm.latitude}, Lng: {lm.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}