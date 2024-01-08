import { AxiosRequestHeaders } from "axios";
import { MouseEventHandler } from "react"

export type endpointTypes = {
    url: string;
    method: string;
    headers?: AxiosRequestHeaders | undefined;
    auth?: boolean;
    urlExtra?: string
}

export type endPointlistTypes={
    loginUser:endpointTypes;
    signUpUser:endpointTypes;
    createBlog:endpointTypes;
    allBlogs:endpointTypes
}

export type lecPropTypes = {
    textVariant?: string,
    containerVariant?: string,
    error?: string
    handleClick?: MouseEventHandler<HTMLDivElement> | undefined,
    handleClear?: MouseEventHandler<HTMLDivElement> | undefined,

}