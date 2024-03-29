import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingInfo } from "../redux/reducers/cartReducers";


const Shipping = () => {
  const countriesList = Object.values(countries);
  const { currentUser } = useSelector((state) => state.userSlice);
  const userId = currentUser?.data._id

  const { shippingInfo } = useSelector((state) => state.cartSlice);

  const [address, setAddress] = useState(shippingInfo[userId]?.address || "");
  const [city, setCity] = useState(shippingInfo[userId]?.city || "");
  const [postalCode, setPostalCode] = useState(shippingInfo[userId]?.postalCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo[userId]?.phoneNo);
  const [country, setCountry] = useState(shippingInfo[userId]?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shippingInfoHandler = (e) => {
    e.preventDefault();
    const shippingInfo = {
      address,
      city,
      postalCode,
      phoneNo,
      country,
    };
    dispatch(saveShippingInfo({ shippingInfo, userId }))
    navigate('/order/confirmOrder')
  };


  return (
    <>
      <CheckoutSteps shipping="shipping" />

      <div className="shipping wrapper flex justify-center items-center mt-20 box-border">
        <div className="w-full lg:w-2/5 xl:w-2/5 bg-white shadow-xl px-8 pt-14 pb-10 mx-14  rounded-md">
          <form className="flex w-full flex-col gap-5" onSubmit={shippingInfoHandler}>
            <h1 className="text-4xl font-semibold pb-5">Shipping Info</h1>
            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="address_field">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="city_field">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col ">
              <label className="text-xl pb-2" htmlFor="phone_field">
                Phone No
              </label>
              <input
                type="phone"
                id="phone_field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                defaultValue={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="postal_code_field">
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                defaultValue={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl pb-2" for="country_field">
                Country
              </label>
              <select
                id="country-field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                defaultValue={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center  pb-3">
              <button
                className="text-white font-semibold bg-red-800 w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
           
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
