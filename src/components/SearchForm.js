import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { searchNannies } from "../redux/searchReducer";
import states from "../states";

const SearchForm = ({ match }) => {
  const history = useHistory();

  const userDataAfterUpdate = useSelector(
    (state) => state.editProfileReducer.userDataAfterUpdate
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(userDataAfterUpdate);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (formData.rating < 0 && formData.Rating > 5) {
      setErrorMessage({ errorRating: "Rating must be between 0 and 5" });
    } else if (!Number(formData.age)) {
      setErrorMessage({ errorAge: "Please enter a valid age" });
    } else if (formData.priceMin < 0 || formData.priceMin > formData.priceMax) {
      setErrorMessage({ errorPrice: "please entre a valid Price" });
    } else {
      dispatch(searchNannies(formData));
      history.push("/parent/search-results");
    }
  };
  const handleCityChange = (e) => {
    if (e.target.value.toLowerCase() !== "selectCity") {
      const { lng, lat, ...rest } = formData;
      setFormData({ ...rest, city: e.target.value.toLowerCase() });
    }
  };
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <form className="formProfile">
        <div className="input-containers">
          <label className="fieldLabel">service type</label>
          <input
            className="fieldInput"
            value={match.params.servicetype}
            type="text"
            placeholder="age"
            disabled
          />
        </div>
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
          <label className="fieldLabel">Rating</label>
          <input
            className="fieldInput fieldInputNumber"
            type="text"
            placeholder="rating"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
        </div>
        {errorMessage.errorRating && (
          <p className="errorMessage">{errorMessage.errorRating}</p>
        )}

        <div className="input-containers">
          <label className="fieldLabel">Price</label>
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
        <div className="input-containers" style={{ marginTop: 10 }}>
          <label className="fieldLabel">Target City</label>

          <select
            className="cityOptions"
            name="cityDropdown"
            onChange={handleCityChange}
          >
            <option value={formData.city}>{formData.city}</option>
            {states.map((value, idx) => {
                return <option value={value}>{value}</option>
              })} 
          </select>
        </div>
        <button className="submitBtn" onClick={handleSubmitSearch}>
          Submit Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
