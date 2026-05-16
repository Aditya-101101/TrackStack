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

        const responseTime = Date.now() - startTime

        const isUp = response.status >= 200 && response.status < 400;

        return {
            status: isUp ? "UP" : "DOWN",
            statusCode: response.status,
            responseTime,
            errorMessage: null,
        }
    } catch (error) {
        const responseTime = Date.now() - startTime;
        return {
            status: "DOWN",
            statusCode: error.response?.status || null,
            responseTime,
            errorMessage: error.message,
        };
    }
}