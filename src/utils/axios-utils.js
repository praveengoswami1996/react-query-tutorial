import axios from "axios";

//Creating an axios client
const client = axios.create({ baseURL: "http://localhost:4000" })

/*
    --Creating and exporting a function that wraps all axios requests--

    This function accepts all the options that axios accepts
    Within the function we set an auth bearer token

*/

export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer token`

    const onSuccess = response => response

    const onError = error => {
        //optionally catch errors and add additional logging here
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}