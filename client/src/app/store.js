import {configureStore} from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice.js'
import dashboardReducer from '../features/dashboard/dashboardSlice.js'
import monitorReducer from '../features/monitors/monitorSlice.js'
import resultsReducer from '../features/results/resultSlice.js'
import statsReducer from '../features/stats/statsSlice.js'
import incidentsReducer from '../features/incidents/incidentSlice.js'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        dashboard:dashboardReducer,
        monitors:monitorReducer,
        results: resultsReducer,
        stats:statsReducer,
        incidents: incidentsReducer,
    }
})