import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import config from "../../../config";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-icon-2x.png";

const MapViewModal = ({ open, latitude, longitude, accurecy, onClose }) => {
  const [getLocation, setGetLocation] = useState(open);
  const [currentLocation, setCurrentLocation] = useState({});
  const createGoogleMapsLink = (
    originLat,
    originLng,
    destinationLat,
    destinationLng
  ) => {
    const link = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}`;
    return link;
  };
  useEffect(() => {
    // Fetch current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error fetching current location:", error);
      }
    );
  }, []);
  const googleMapsLink = createGoogleMapsLink(
    currentLocation?.latitude,
    currentLocation?.longitude,
    latitude,
    longitude
  );
  console.log(googleMapsLink);
  const HandleMapLink = async () => {
    window.location.replace(`${googleMapsLink}`);
  };
  const handleToggle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const update = axios
      .post(`${config.api_url}/api/command`, {
        location: {
          status: open,
        },
        cmdId: user?.id,
      })
      .then((res) => {
        console.log("res", res);
      });
  };
  useEffect(() => {
    setGetLocation(open);
    handleToggle();

    if (getLocation) {
      setTimeout(() => {
        setGetLocation(false);
      }, 5000);
    }
  }, [open]);

  return (
    <Dialog open={open} maxWidth="md" onClose={onclose} fullWidth>
      <DialogTitle>Map View</DialogTitle>
      <DialogContent>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "400px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latitude, longitude, accurecy]} />
        </MapContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={HandleMapLink} color="primary">
          Go To GoogleMaps Direction
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapViewModal;
