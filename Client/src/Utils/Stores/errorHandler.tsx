import errorAlert from "../ResponseHandler/error"

export default function errorHandler(err: any) {
    if (err && err.response && err.response.status === 200) {
        // Handle successful response (if needed)
        return;
    }else if (err && (err instanceof Object && !(err instanceof Array))) {
        if (err.response) {
            if (err.response.status == 400) {
                errorAlert({ title: err.response.data.message, text: err.response.data.message, errors: err.response.data.errs ? err.response.data.errs : {} })
            }
            else if (err.response.status == 500) {
                errorAlert({ title: "An error occured", text: err.response.data.message, errors: err.response.data.errs ? err.response.data.errs : {} })
            }
            else if (err.response.status == 401) {
                window.location.href = '/login'
            } else {
                errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: {} })
                console.log(err)
            }
        } else {
            errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: {} })
            console.log("Non specific error caught 2 : ")
            console.log(err)
        }
    } else {
        errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: {} })
        console.log("Non specific error caught 3 : ")
        console.log(err)
    }
}