
import React from "react";
import { notify } from "./toaster";
// import { SmSuccessModalIcon } from "../../components/reusables/icons";
import { GrStatusGood } from "react-icons/gr";


export default function successAlert(details: { title: any; text: any; icon: any; }, response: { data: any; errs: any; message: any; statusCode: any; }) {


    const { title, text, icon } = details || {}
    const { data, errs, message, statusCode } = response || {}

    console.log("titleZZZ>>>", title)
    console.log("messageYYY>>>", text)

    return notify({ header: `${title ? title : "Successful!"}`, details: text ? text : message ? message : null, icon: <GrStatusGood /> })

  
}