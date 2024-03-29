import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";
import { API_URl } from "@env";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, SetIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRegister, SetUserRegister] = useState(null);
  const [otptoken, SetOtpToken] = useState(null);
  const [DeliveryAccess, setDeliveryAccess] = useState(null);
  const [user, SetUser] = useState(null);
  const [mobile, Setmobile] = useState("");

  //Taking the mobile number from the user
  const mobilenum = (mobile) => {
    Setmobile(mobile);
    //console.log(mobile);
  };

  //CommonRegister Authentication
  const CommonRegister = (formdata) => {
    SetIsLoading(true);
    axios
      .post(`${API_URl}/register/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "No Auth",
        },
      })
      .then((res) => {
        let userRegister = res.data;
        SetUserRegister(res.status);
        console.log(res.data);
        console.log(res.status);
        console.log(res.data.token.access);
        setDeliveryAccess(userRegister.token.access);
        AsyncStorage.setItem("UserRegister", JSON.stringify(userRegister));
        AsyncStorage.setItem("DeliveryAccess", userRegister.token.access);
        //console.log(userRegister.status);
        SetIsLoading(false);
      })
      .catch((Error) => {
        console.log(Error);
        alert("Registration failed");
        SetIsLoading(false);
      });
  };

  //DeliveryPerson Register
  const DeliveryPersonRegister = (
    vehicle_name,
    vehicle_type,
    vehicle_number
  ) => {
    SetIsLoading(true);
    if (vehicle_type === "OT") {
      axios
        .post(
          `${API_URl}/vehicledata/`,
          {
            vehicle_name: vehicle_name,
            vehicle_number: vehicle_number,
          },
          {
            headers: {
              Authorization: `Bearer ${DeliveryAccess}`,
            },
          }
        )
        .then((res) => {
          console.warn(res.data);

          SetIsLoading(false);
        })
        .catch((Error) => {
          console.warn(Error);
          SetIsLoading(false);
        });
    } else {
      axios
        .post(
          `${API_URl}/vehicledata/`,
          {
            vehicle_name: vehicle_name,
            vehicle_type: vehicle_type,
            vehicle_number: vehicle_number,
          },
          {
            headers: {
              Authorization: `Bearer ${DeliveryAccess}`,
            },
          }
        )
        .then((res) => {
          console.warn(res.data);
          SetIsLoading(false);
        })
        .catch((Error) => {
          console.warn(Error);
          SetIsLoading(false);
        });
    }
  };

  const RegisterShopData = (
    shop_name,
    shop_shortdescribtion,
    shop_describtion,
    shop_address,
    shop_gst,
    location_longitude,
    location_latitude
  ) => {
    const locationstring = `POINT(${location_longitude} ${location_latitude})`;
    SetIsLoading(true);
    axios
      .post(
        `${API_URl}/shopdata/`,
        {
          shop_name: shop_name,
          shop_shortdescribtion: shop_shortdescribtion,
          shop_describtion: shop_describtion,
          shop_address: shop_address,
          shop_gst: shop_gst,
          location: locationstring,
        },
        {
          headers: {
            Authorization: `Bearer ${DeliveryAccess}`,
          },
        }
      )
      .then((res) => {
        console.warn(res.data);
        SetIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        SetIsLoading(false);
      });
  };

  //Login Authentication,
  const login = (mobile_number, password) => {
    SetIsLoading(true);
    axios
      .post(
        `${API_URl}/login/`,
        {
          mobile_number: "91" + mobile_number,
          password: password,
        },
        {
          headers: {
            Authorization: "No Auth",
          },
        }
      )
      .then((res) => {
        //console.log(res.data.status.message);
        let userInfo = res.data;
        setUserInfo(userInfo);
        SetUser(userInfo.data.user_type);
        setUserToken(userInfo.token.access);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userInfo.token.access);
        SetIsLoading(false);
      })
      .catch((e) => {
        alert("Invalid Email or Password");
        console.log(e);
        SetIsLoading(false);
      });
  };

  //Logout Authentication
  const logout = () => {
    SetIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    SetIsLoading(false);
  };

  //GET OTP Authentication
  const GetOtp = (mobile_number) => {
    SetIsLoading(true);
    axios
      .get(`${API_URl}/otp/?mobile_number=${"91" + mobile_number}`, {
        mobile_number: mobile_number,
      })
      .then((res) => {
        let otptoken = res.data.data.token;
        SetOtpToken(otptoken);
        SetIsLoading(false);
        //console.log(res.data.data.token);
      })
      .catch((e) => {
        console.log(e);
        SetIsLoading(false);
      });
  };

  //RESET Password Authentication
  const resetpass = (otp, mobile_number, password) => {
    SetIsLoading(true);
    axios
      .post(
        `${API_URl}/forget-password/`,
        {
          token: otptoken,
          otp: otp,
          mobile_number: "91" + mobile_number,
          password: password,
        },
        {
          headers: {
            Authorization: "No Auth",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Password updated");
        SetIsLoading(false);
      })
      .catch((e) => {
        alert("Error Ocuured! Try again Later");
      });
  };

  return (
    <Authcontext.Provider
      value={{
        CommonRegister,
        DeliveryPersonRegister,
        mobilenum,
        resetpass,
        GetOtp,
        logout,
        login,
        isLoading,
        userToken,
        userInfo,
        DeliveryAccess,
        otptoken,
        RegisterShopData,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
