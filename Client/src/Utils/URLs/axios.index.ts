import axios from "axios";
import successAlert from "../ResponseHandler/Success";
import errorHandler from "../Stores/errorHandler";
import { Storage } from "../Stores/inAppStorage";
import { BASEURL } from "./api.env";
import { endPoints } from "./apiLib";

const baseUrl = (): any => `${BASEURL}`;


type urlPropTypes = {
    urlExtra?: string
    name?: string
    data?: any
    params?: any
    action?: (data: any) => string[] | undefined
    errorAction?: (err: any) => string[] | undefined
    successDetails?: { title: any; text: any; icon: any; }
}

export const apiCall = ({ urlExtra, name, data = {}, params = {}, action = () => undefined, errorAction = () => undefined, successDetails = { title: "", text: "", icon: "" } }: urlPropTypes) => new Promise((res, rej) => {

    let theName = name as keyof typeof endPoints
    let userDetails: any = Storage?.getItem('userDetails') || '{}'
    let { token } = userDetails || { token: "" }
    console.log(token,'the tokennnnnnnnnnnnnnnnn')

    let headers: any = endPoints[theName] ? endPoints[theName].headers ? endPoints[theName].headers : {} : {}
    let formData = new FormData();
   for( var i = 0; i < data.length; i++ ){
        let file = data[i];
        console.log(file,'why isnt this working')
        formData.append('files[' + i + ']', file);
      }
    if (endPoints[theName].auth) headers['Authorization'] = `Bearer ${token}`
console.log(formData,headers,data,'the headersss3')
    axios({
        url: `${baseUrl()}${endPoints[theName] ? endPoints[theName].url : ""}${urlExtra ? urlExtra : ""}`,
        method: endPoints[theName] ? endPoints[theName].method : "",
        data,
        headers: endPoints[theName] ? endPoints[theName].headers : undefined,
        // data:headers==='headers'?data:formData,
       
        params
    })
        .then(async r => {
            const returned = await action(r.data);
            console.log(r,'the statututuut')
            if (r.status === 401 ) {
                // Handle 401 Unauthorized error (log out and redirect to login)
                // Example: Redirect to the login page
                window.location.href = '/login';
                console.log(r,'from the api')
            } 
            else if ((r.data.respCode === "00" ||  r.data.respCode === "SUCCESS" || r.data.respCode==='OK' || r.data.respCode === "200"||r.status ===201 ) && !returned?.includes("skip")) {
                successAlert(successDetails, r.data);
                console.log("successZZZ>>>", successDetails)
                console.log("successYYY>>>",  r.data)
                r?.data?.respBody ? res(r.data.respBody) : res(r.data)
            } else if (r.data.respCode === "00" || r.status === 200 ||r.data.respCode === "200"||r.status ===201 ) {
                r?.data?.respBody ? res(r.data.respBody) : res(r.data)
            }
            else if (r.data.respCode !== "00" && ![200, 201].includes(r.status)) {
                errorHandler(r)
            } else if (returned?.includes("push")) {
                successAlert(successDetails, r.data)
            } else {
                console.log("Response Error 1:", r)
            }
        })
        .catch(async err => {
            const returned = await errorAction(err)
            if (!returned?.includes("skip")) {
                console.log("Response Error 2:", err)
                errorHandler(err)
                rej(err)
            } else {
                console.log("Response Error 3:", err)
                rej(err);
                return err
            }
        });
});