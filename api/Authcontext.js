import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";
import { API_URl } from "@env";

export const Authcontext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [isLoading, SetIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRegister, SetUserRegister] = useState(null);
  const [otptoken, SetOtpToken] = useState(null);
  const [DeliveryAccess, setDeliveryAccess] = useState(null);
  const [user, SetUser] = useState(null);
  const [mobile, Setmobile] = useState("");
  const [data, setData] = useState([]);
  const [jobid, SetJobId] = useState(null);

  //Taking the mobile number from the user
  const mobilenum = (mobile) => {
    Setmobile(mobile);
    //console.log(mobile);
  };

  const JobId = (jobid) => {
    SetJobId(jobid);
    AsyncStorage.setItem("jobid", jobid);
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

  //OTP Login Authentication,
  const OTPlogin = (mobilenumber, otp) => {
    SetIsLoading(true);
    axios
      .post(
        `${API_URl}/login/`,
        {
          mobile_number: "+91" + mobilenumber,
          otp: otp,
          token: otptoken,
        },
        {
          headers: {
            Authorization: "No Auth",
          },
        }
      )
      .then((res) => {
        console.log(res.data.status.message);
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
      .get(`${API_URl}/otp/?mobile_number=${"91" + mobile_number}`)
      .then((res) => {
        //console.log(mobile_number);
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

  //Delete Shop data
  const DeleteAcc = () => {
    SetIsLoading(true);
    let dId = userInfo.token.access;
    axios
      .delete(`${API_URl}/delete-data/`, {
        headers: {
          Authorization: `Bearer ${dId}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserToken(null);
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("userToken");
        SetIsLoading(false);
        alert("Account Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ValidatePickup = (otp) => {
    axios
      .post(
        `${API_URl}/accept-jobitem/`,
        {
          job_id: jobid,
          token: otptoken,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status.code === 403) {
          alert("No job exists");
        } else {
          alert("Your Pickup has been Validated!");
        }
      })
      .catch((err) => {
        alert("Wrong OTP Provided!");
      });
  };

  const ValidateDelivery = (otp) => {
    axios
      .post(
        `${API_URl}/item-delivery/`,
        {
          job_id: jobid,
          token: otptoken,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status.code === 403) {
          alert("No job exists");
        } else {
          alert("Your Delivery has been Validated!");
        }
      })
      .catch((err) => {
        alert("Wrong OTP Provided!");
      });
  };

  const GetPropOTP = (mobilenumber) => {
    SetIsLoading(true);
    axios
      .get(`${API_URl}/otp/?mobile_number=${mobilenumber}`)
      .then((res) => {
        console.log(mobilenumber);
        //let otptoken = res.data.data.token;
        SetOtpToken(res.data.data.token);
        console.log(otptoken);
        SetIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        SetIsLoading(false);
      });
  };

  const GetDelOTP = (mobilenumber) => {
    SetIsLoading(true);
    axios
      .get(`${API_URl}/otp/?mobile_number=${mobilenumber}`)
      .then((res) => {
        //console.log(mobile_number);
        //let delotp = res.data.data.token;
        SetOtpToken(res.data.data.token);
        SetIsLoading(false);
        //console.log(res.data.data.token);
      })
      .catch((e) => {
        console.log(e);
        SetIsLoading(false);
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
        DeleteAcc,
        JobId,
        jobid,
        ValidatePickup,
        ValidateDelivery,
        OTPlogin,
        GetPropOTP,
        GetDelOTP,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
