import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DefaultInput from "../components/DefaultInput";
import OTPInput from "../components/OTPInput/Index";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [clearInput, setclearInput] = useState(false);
  const [stage, setStage] = useState("");

  function handleChange() {
    if (stage === "") {
      setStage("1");
    }
    if (stage === "1") setStage("2");
  }
  return (
    <div className="grid md:grid-cols-2 h-screen items-center">
      <img
        src="https://media.istockphoto.com/id/1365436662/photo/successful-partnership.jpg?s=612x612&w=0&k=20&c=B1xspe9Q5WMsLc7Hc9clR8MWUL4bsK1MfUdDNVNR2Xg="
        alt=""
        className="hidden md:block object-fit w-full h-full "
      />
      <div className="m-auto grid gap-[20px] text-black w-3/4">
        <p className="font-bold text-[30px] text-primary">QUILLQUEST</p>
        {stage !== "2" ? (
          <>
            <div className="grid">
              <DefaultInput
                type="email"
                name="email"
                id=""
                placeHolder="xyz@gmail.com"
                label="Email"
              />
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-dark-brown">
                  Not Signed up yet?{" "}
                  <span
                    className="underline text-primary hover:cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </span>{" "}
                </p>
                {/* <p className="font-bold text-[12px] text-black hover:cursor-pointer " onClick={()=> navigate('/signup')}>Signup here!</p> */}
              </div>
            </div>
            {stage === "1" && (
              <div className="">
                <OTPInput
                  length={4}
                  className="flex gap-5 mt-5"
                  inputClassName="w-8 h-8 text-3xl text-center border border-gray-300 rounded-md focus:border border-gray-200 focus:ring-1 ring-blue-aqua"
                  isNumberInput
                  autoFocus
                  clearInputs={clearInput}
                  onChangeOTP={(otp) => setOtp(otp)}
                />
                <p className="text-black text-[13px] mt-1">
                  Input the codes sent to your email
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <DefaultInput
              type="password"
              name="Password"
              id=""
              placeHolder="******"
              label="Password"
            />
            <div className="grid">
              <DefaultInput
                type="password"
                name="Password"
                id=""
                placeHolder="******"
                label="Confirm Password"
              />
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-dark-brown">
                  Not Signed up yet?{" "}
                  <span
                    className="underline text-primary hover:cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </span>{" "}
                </p>
              </div>
            </div>
          </>
        )}
        <Button
          title={
            stage === ""
              ? "Continue"
              : stage === "1"
              ? "Reset Password"
              : "Submit"
          }
          onClick={handleChange}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
