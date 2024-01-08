import React, { useEffect } from 'react'
import { lecPropTypes } from '../URLs/types';
import { notify } from './toaster';
//import { notify } from "./toaster";
// import { SmErrorModalIcon } from "@/components/reusables/icons";
import { RiErrorWarningLine } from "react-icons/ri";


export const ErrorCard = ({ textVariant = "", containerVariant = "", error = "", handleClick = () => undefined, handleClear = () => undefined }: lecPropTypes) => {
    return (
        <div>
           


            <div className= {`bg-red-100 border border-red-400 text-red-700  px-5 py-3 pr-8 flex flex-wrap rounded relative ${containerVariant || null}`} role="alert">
                <strong className="font-bold">Error Message:</strong> &nbsp;
                <span className={`block sm:inline ${textVariant || null}`}>{error} </span>
                <span className="absolute top-[-12px] bottom-0 right-[-10px] px-4 py-3" onClick={handleClear}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
            </div>
        </div>


    )
}



export default function errorAlert({ title, text, errors, icon }: any) {

    return notify({ header: `${title ? title : "An Error occured!"}`, details: text ? text : "Oops an error occured, please try again later.", icon: <RiErrorWarningLine className='text-red' /> })
}
