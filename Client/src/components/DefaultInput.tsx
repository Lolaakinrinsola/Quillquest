import React, { forwardRef, useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

const DefaultInput = forwardRef<any, any>(
  ({
    id,
    type,
    name,
    label,
    handleChange = () => null,
    handleBlur,
    value,
    error,
    validate,
    maxLength = 1000,
    minLength = 0,
    validationFunc = () => null,
    placeHolder,
    required,
    readOnly,
    checkNum,
    className,
    isDisabled = false,
  }: any) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [min, setMin] = useState(false);
    const [cap, setCap] = useState(false);
    const [low, setLow] = useState(false);
    const [num, setNum] = useState(false);

    const togglePasswordVisiblity = () => {
      setPasswordShown(!passwordShown);
    };

    useEffect(() => {
      if (value?.length >= 8) {
        setMin(true);
      } else if (value?.length < 8) {
        setMin(false);
        validationFunc();
      }
      if (/\d/.test(value)) {
        setNum(true);
      } else if (!/\d/.test(value)) {
        setNum(false);
      }
      if (/[a-z]/.test(value)) {
        setLow(true);
      } else if (!/[a-z]/.test(value)) {
        setLow(false);
      }
      if (/[A-Z]/.test(value)) {
        setCap(true);
      } else if (!/[A-Z]/.test(value)) {
        setCap(false);
      }
      if (min && cap && low && num) {
        validationFunc();
      }
    }, [value]);

    const onChange = (e: any) => {
      const pattern = /^\d+$/;
      const whiteSpace = /[\s]/;

      if (type == "password" && (whiteSpace.test(e.target.value) || "")) {
        return null;
      }

      if (checkNum) {
        if (pattern.test(e.target.value) || "") {
          handleChange(e);
        }
      } else {
        handleChange(e);
      }
    };
    return (
      <div className="grid gap-1 text-[#344054]">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={id}
          type={type === "password" && passwordShown ? "text" : type}
          onChange={onChange}
          maxLength={maxLength}
          minLength={minLength}
          onBlur={handleBlur}
          value={value}
          placeholder={placeHolder}
          disabled={isDisabled}
          required={required || false}
          readOnly={readOnly || false}
          className={`placeholder:text-[#D0D5DD] border-[#D0D5DD] border-[1px] rounded-md py-[10px] px-[14px] focus:border-primary w-full ${className}`}
          name={name}
        />
        {type === 'password' &&
          <>
            <div className='relative cursor-pointer flex items-center justify-center'>
              <span className={`absolute bottom-4 right-[5%] text-gray-500 ${validate ? "right-12" : "right-6"}`} onClick={togglePasswordVisiblity}>
                {passwordShown ? <AiOutlineEyeInvisible size={25} color="#667085" /> : <AiOutlineEye size={25} color="#667085" />}
              </span>
            </div>

            {validate &&
              <div className={`relative cursor-pointer flex items-center justify-center`}>
                <div className="absolute mb-1.5 bottom-4 right-4 flex flex-col items-center group">
                  {/* <SmPasswordCheckIcon /> */}
                  <div className="absolute bottom-0 flex flex-col items-center  mb-6 hidden group-hover:flex min-w-[100%] ">
                    <div className="relative z-10 p-2 text-xs leading-none  whitespace-no-wrap bg-primary-white shadow-lg rounded-md border-black-200  min-w-[260px] px-4 py-4">
                      <div>
                        <div className='flex gap-2 items-center font-300 text-xs text-blue-midnight py-2'>
                          <span>
                            {min ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                          </span>
                          <span>Minimum number of characters: 8</span>
                        </div>
                        <div className='flex gap-2 items-center font-300 text-xs text-blue-midnight py-2'>
                          <span>
                            {cap ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                          </span>
                          <span>Contains a capital letter</span>
                        </div>
                        <div className='flex gap-2 items-center font-300 text-xs text-blue-midnight py-2'>
                          <span>
                            {low ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                          </span>
                          <span>Contains a lowercase letter</span>
                        </div>
                        <div className='flex gap-2 items-center font-300 text-xs text-blue-midnight py-2'>
                          <span>
                            {num ? <BsFillCheckCircleFill size={15} color="#50D39C" /> : <BsFillXCircleFill size={15} color="#F03D3E" />}
                          </span>
                          <span>Contains a number</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-primary-white shadow-md rounded-md "></div>
                  </div>
                </div>
              </div>
            }
          </>
        }
        {
          error && error != "" && (
            <p className="text-red-500 font-[Inter-Regular] text-xs h-auto py-1">{error}</p>
          )
        }
      </div>
    );
  }
);

export default DefaultInput;
