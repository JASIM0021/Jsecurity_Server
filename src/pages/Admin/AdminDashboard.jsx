import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Tourch from "../../components/Tourch";
import MapViewModal from "../TAsk/MapView";
import CallScreen from "../TAsk/call/CallScreen";
import config from "../../../config";
import { FormControlLabel, Switch } from "@mui/material";

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState({});
  const [locationModel, setlocationModel] = useState(false);
  const [tourchmodel, setTourchmodel] = useState(false);
  const [getLocation, setGetLocation] = useState({});
  const [callScreen, setCallScreen] = useState(false);
  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem("isDeactive")) || false
  );
  console.log("active", active);
  const handleToggle = (e) => {
    if (e.target.checked) {
      localStorage.setItem("isDeactive", JSON.stringify(false));
      setActive(false);
    } else if (!e.target.checked) {
      setActive(true);
      localStorage.setItem("isDeactive", JSON.stringify(true));
    }

    // Toggle the active state
    const update = axios
      .post(`${config.api_url}/api/command`, {
        isDeactive: active,
        cmdId: user?.id,
      })
      .then((res) => {
        console.log("res", res);
      });
  };
  console.log(
    "deviceDetails",
    deviceDetails?.deviceDetails?.device?._j?.devicename?._j,
    getLocation
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const getDeviceData = async () => {
    const res = await axios.get(`${config.api_url}/${user?.id}`);
    setDeviceDetails(res?.data);
  };
  const getLocationFromDb = async () => {
    await axios
      .post(`${config.api_url}/api/command`, {
        cmdId: user?.id,
      })
      .then((res) => {
        console.log("res", res);
        setGetLocation({
          ...getLocation,
          latitude: res?.data?.findExisting?.location?.latitude,
          longitude: res?.data?.findExisting?.location?.longitude,
          accuracy: res?.data?.findExisting?.location?.accuracy,
        });
      });
  };

  useEffect(() => {
    getDeviceData();
    getLocationFromDb();
    // handleToggle();
  }, []);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowModal(true);
  };

  const androidFeatures = [
    {
      title: "Get Location",
      description: "Get the current location of the Android device.",
      action: "getLocation",
      onClick: () => {
        setlocationModel(true);
      },
    },
    {
      title: "Capture Photo",
      description: "Capture a photo using the device camera.",
      action: "capturePhoto",
    },
    {
      title: "Toggle Flashlight",
      description: "Toggle the flashlight on the device.",
      action: "toggleFlashlight",
      onClick: () => {
        setTourchmodel(true);
      },
    },
    {
      title: "Get All Details",
      description: "Get the all details  of the device.",
      action: "getAllDetails",
    },
    {
      title: "Make a Call",
      description: "call anyone with any number",
      action: "makeAcall",
      onClick: () => {
        setCallScreen(true);
      },
    },
    {
      title: "Play Music",
      description: "Play music on the device.",
      action: "playMusic",
    },
    // Add more Android controlling features here
  ];

  const renderModalContent = () => {
    if (!selectedFeature) {
      return null;
    }

    switch (selectedFeature.action) {
      // case 'getLocation':
      //   return (
      //     <div>
      //       <h2 className="text-2xl mb-4">{selectedFeature.title}</h2>

      //       {/* Add content for Get Location feature */}
      //     </div>
      //   );
      case "capturePhoto":
        return (
          <div>
            <h2 className="text-2xl mb-4">{selectedFeature.title}</h2>
            {/* Add content for Capture Photo feature */}
          </div>
        );
      case "toggleFlashlight":
        return <Tourch selectedFeature={selectedFeature} />;
      case "getAllDetails":
        return (
          <div>
            <h2 className="text-2xl mb-8">{selectedFeature.title}</h2>
            {/* Add content for Get Battery Level feature */}
            <h2>Device Name </h2>:{" "}
            <h2>{deviceDetails?.deviceDetails?.device?._j?.devicename?._j}</h2>
          </div>
        );
      case "playMusic":
        return (
          <div>
            <h2 className="text-2xl mb-4">{selectedFeature.title}</h2>
            {/* Add content for Play Music feature */}
          </div>
        );
      default:
        return null;
    }
  };
  const destinationCoordinates = {
    latitude: 51.5074,
    longitude: -0.1278,
  };

  return (
    <div className="p-4">
      <MapViewModal
        latitude={getLocation.latitude || 28.7041}
        longitude={getLocation.longitude || 77.1025}
        accurecy={getLocation.accurecy}
        open={locationModel}
        coordinates={destinationCoordinates}
        onClose={() => setlocationModel(false)}
      />
      <Tourch open={tourchmodel} onClose={() => setTourchmodel(false)} />
      <CallScreen open={callScreen} setOpen={setCallScreen} />

      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      {/* Toggle Button */}
      <div className="text-center mb-4" style={{ pointerEvents: "auto" }}>
        <FormControlLabel
          control={
            <Switch checked={!active} onClick={(e) => handleToggle(e)} />
          }
          label={active ? "Deactive" : "Active"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {androidFeatures.map((feature, index) => (
          <div key={index} className="p-4 bg-green-500 text-white rounded-lg">
            <h2 className="text-2xl mb-4">{feature.title}</h2>
            <p>{feature.description}</p>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={feature.onClick}
            >
              {feature.title}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg ">
            {renderModalContent()}
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
