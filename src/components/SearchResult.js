import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import cityCenters from "../Data/cityCenter";
import ReactLoading from "react-loading";
import pin from "../img/map pin.png";
const SearchResult = () => {
  const mapContainerStyle = {
    height: "80vh",
    width: "80vw",
    margin: "2.5% auto",
    borderRadius: 15,
    position: "relative",
  };

  const searchResultData = useSelector(
    (state) => state.searchReducer.searchResultData
  );
  const searchStatus = useSelector((state) => state.searchReducer.status);
  const [selectedNanny, setSelectedNanny] = useState(null);
  var defaultCenterState = [];
  const [center, setCenter] = useState({ lat: 36.457526, lng: 10.778335 });

  useEffect(() => {
    defaultCenterState = cityCenters.filter(
      (el) => el.name === searchResultData[0]?.city
    );
    setCenter({
      lat: defaultCenterState[0]?.lat,
      lng: defaultCenterState[0]?.lng,
    });
  }, [searchResultData]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedNanny(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded)
    return <ReactLoading type="bubble" color="blue" height={667} width={375} />;
  if (searchStatus !== "loading" && searchResultData.length === 0) {
    return (
      <>
        <Navbar button1="Edit profile" button2="Logout" />
        <h3 style={{ textAlign: "center", marginTop: 20 }}>
          Your search did not find any matches
        </h3>
      </>
    );
  }
  return (
    <>
      <Navbar button1="Edit profile" button2="Logout" />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={() => setSelectedNanny(null)}
      >
        {searchResultData.map((el) => (
          <Marker
            key={el._id}
            position={{
              lng: el.lng,
              lat: el.lat,
            }}
            onClick={() => {
              setSelectedNanny(el);
              setCenter({ lng: el.lng, lat: el.lat });
            }}
          />
        ))}
        <img src={pin} className="map-pin" alt="map-pin" />
        {selectedNanny && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedNanny(null);
            }}
            position={{
              lat: selectedNanny.lat + 0.01,
              lng: selectedNanny.lng,
            }}
          >
            <div>
              <h3>{selectedNanny.fullName}</h3>
              <span>${selectedNanny.pricing}</span>
              <Link to={`/parent/search/results/profile/${selectedNanny._id}`}>
                <p> See Profile</p>
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};
export default SearchResult;
