import axios from "axios";
import { loggerFactory, LogMessageType } from "../tools/loggerFactory";

const logger = loggerFactory("F2CM-RESPONSE-INTERCEPTOR")
// Error Handling
axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    logger(`${response.config.url} returned ${response.status}`, LogMessageType.success)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    logger(`${error}\n${JSON.stringify(error)}`, LogMessageType.error)
    const errorMessage = error?.response?.data?.message;
    const errorName = error?.response?.data?.name;

    return Promise.reject({
        name: errorName || `Error`,
        message: errorMessage || error.message,
    });
});