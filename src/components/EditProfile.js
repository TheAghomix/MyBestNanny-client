import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { editProfile } from "../redux/editProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import axios from "axios";
import feedingBottle from "../img/feeding bottle.png";
import states from "../states";
import babyToy from "../img/babytoy.png";
const EditProfile = () => {
  const dispatch = useDispatch();

  const userDataAfterUpdate = useSelector(
    (state) => state.editProfileReducer.userDataAfterUpdate
  );
  const userData = useSelector((state) => state.authR.userData);
  const type = userData.type;

  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  function showPosition(position) {
    setFormData({
      ...formData,
      lng: position.coords.longitude,
      lat: position.coords.latitude,
    });
  }

  function getLocation(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(showPosition)
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.fullName) {
      setErrorMessage({ errorfullName: "Please enter a valide Name" });
    } else if (!formData.phone) {
      setErrorMessage({ errorPhone: "Please enter a valide Phone Number" });
    } else if (formData.rating < 0 && formData.Rating > 5) {
      setErrorMessage({ errorRating: "Rating must be between 0 and 5" });
    } else if (!Number(formData.age)) {
      setErrorMessage({ errorAge: "Please enter a valid age" });
    } else if (formData.priceMin < 0 && formData.priceMin > formData.priceMax) {
      setErrorMessage({ errorPrice: "please entre a valid Price" });
    } else {
      dispatch(
        editProfile({ id: userData._id, type: userData.type, formData })
      );
      history.push(`/${type}/dashboard`);
    }
  };
  useEffect(() => {
    setFormData(userDataAfterUpdate);
  }, [userDataAfterUpdate]);
  useEffect(() => {
    formData.lng &&
      axios
        .get(
          `https://eu1.locationiq.com/v1/reverse.php?key=pk.4a75d679e443c41d0a8b09ba9eed7274&lat=${formData.lat}&lon=${formData.lng}&format=json`
        )
        .then((result) => {
          setFormData({
            ...formData,
            city:
              result?.data?.address?.city?.toLowerCase() ||
              result?.data?.address?.town?.toLowerCase() ||
              result?.data?.address?.state?.toLowerCase() ||
              result?.data?.display_name.toLowerCase(),
          });
        })
        .catch((err) => console.log(err));
  }, [formData?.lat]);

  const handleCityChange = (e) => {
    if (e.target.value.toLowerCase() !== "selectCity") {
      const { lng, lat, ...rest } = formData;
      setFormData({ ...rest, city: e.target.value.toLowerCase() });
    }
  };

  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <img className="decor1" src={babyToy} alt="babyToy" />
      <img className="decor2" src={feedingBottle} alt="feedingBottle" />
      <form className="formProfile">
        <div className="input-containers">
          <label className="fieldLabel">Full Name</label>
          <input
            className="fieldInput"
            type="text"
            // value={formData.fullName}
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder={formData.fullName}
          />
        </div>
        {errorMessage.errorfullName && (
          <p className="errorMessage">{errorMessage.errorfullName}</p>
        )}
        <div className="input-containers">
          <label className="fieldLabel">Phone Number</label>
          <input
            className="fieldInput"
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        {errorMessage.errorPhone && (
          <p className="errorMessage">{errorMessage.errorPhone}</p>
        )}
        {type === "parent" && (
          <i style={{ margin: 10, fontWeight: "bold", color: "#C36839" }}>
            defaultSearchSettings
          </i>
        )}

        {type === "parent" && (
          <div className="input-containers">
            <label className="fieldLabel">Minimum Rating</label>
            <input
              className="fieldInput fieldInputNumber"
              type="text"
              placeholder="Minimum Rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
            {errorMessage.errorRating && (
              <p className="errorMessage">{errorMessage.errorRating}</p>
            )}
          </div>
        )}
        <div className="input-containers">
          <label className="fieldLabel">Age</label>
          <input
            className="fieldInput fieldInputNumber"
            type="text"
            placeholder="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        {errorMessage.errorAge && (
          <p className="errorMessage">{errorMessage.errorAge}</p>
        )}

        <div className="input-containers">
          {type === "parent" ? (
            <div className="input-containers">
              <label className="fieldLabel">Price Range</label>
              <input
                className="fieldInput fieldInputNumber"
                type="text"
                placeholder="price min"
                value={formData.priceMin}
                onChange={(e) =>
                  setFormData({ ...formData, priceMin: e.target.value })
                }
              />
              <input
                className="fieldInput fieldInputNumber"
                type="text"
                placeholder="price max"
                value={formData.priceMax}
                onChange={(e) =>
                  setFormData({ ...formData, priceMax: e.target.value })
                }
              />
              {errorMessage.errorPrice && (
                <p className="errorMessage">{errorMessage.errorPrice}</p>
              )}
            </div>
          ) : (
            <div className="input-containers">
              <label className="fieldLabel">Pricing</label>
              <input
                className="fieldInput fieldInputNumber"
                type="text"
                placeholder="Your Pricing"
                value={formData.pricing}
                onChange={(e) =>
                  setFormData({ ...formData, pricing: e.target.value })
                }
              />
            </div>
          )}
        </div>
        {type === "nanny" && (
          <div className="input-containers">
            <label className="fieldLabel">profilePicture</label>

            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
            />
          </div>
        )}
        <div className="input-containers">
          <label className="fieldLabel">City</label>

          {type === "parent" ? (
            <select
              className="cityOptions"
              name="cityDropdown"
              onChange={handleCityChange}
            >
              <option value="selectCity">Select a City</option>
              <option value={formData.city}>{formData.city}</option>
              {states.map((value, idx) => {
                return <option value={value}>{value}</option>
              })} 
              {/* <option value="nabeul">Nabeul</option>
              <option value="beni khiar">Béni Khiar</option>
              <option value="Korba">Korba</option>
              <option value="Tunis">Tunis</option>
              <option value="Dar Chaaban">Dar Chaaban</option> */}
            </select>
          ) : (
            <input
              className="fieldInput"
              type="text"
              placeholder="city"
              value={formData.city}
              disabled={true}
            />
          )}

          {errorMessage.errorCity && (
            <p className="errorMessage">{errorMessage.errorCity}</p>
          )}
          <button className="locationBtn" onClick={getLocation}>
            Update city
          </button>
        </div>

        <button className="submitBtn" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
