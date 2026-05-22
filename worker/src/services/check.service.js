import axios from 'axios'

export const performHttpCheck = async (monitor) => {
    const startTime = Date.now()

    try {
        const response = await axios({
            method: monitor.method,
            url: monitor.url,
            timeout: monitor.timeout,
            validateStatus: () => true,
        })

        const responseTime = Date.now() - startTime;

        console.log("CHECK RESPONSE:", {
            url: monitor.url,
            status: response.status,
            statusText: response.statusText,
            finalUrl: response.request?.res?.responseUrl,
        });

        const isUp = response.status >= 200 && response.status < 400;

        return {
            status: isUp ? "UP" : "DOWN",
            statusCode: response.status,
            responseTime,
            errorMessage: isUp
                ? null
                : `HTTP ${response.status} ${response.statusText}`,
        };
    } catch (error) {
        const responseTime = Date.now() - startTime;

        console.log("CHECK NETWORK ERROR:", {
            url: monitor.url,
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
        });

        return {
            status: "DOWN",
            statusCode: error.response?.status || null,
            responseTime,
            errorMessage: error.message,
        };
    }
}