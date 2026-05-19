import mongoose from 'mongoose'

const monitorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: [true, "Monitor name is required"],
        trim: true,
    },
    url: {
        type: String,
        required: [true, "URL is required"],
        trim: true
    },
    method: {
        type: String,
        enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        default: "GET",
    },

    interval: {
        type: Number,
        default: 300,
        min: [60, "Interval must be at least 60 seconds"],
    },

    timeout: {
        type: Number,
        default: 5000,
        min: [1000, "Timeout must be at least 1000ms"],
        max: [30000, "Timeout cannot exceed 30000ms"],
    },

    status: {
        type: String,
        enum: ["UP", "DOWN", "PAUSED", "UNKNOWN"],
        default: "UNKNOWN",
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    consecutiveFailures: {
        type: Number,
        default: 0,
    },

    consecutiveSuccesses: {
        type: Number,
        default: 0,
    },

    lastCheckedAt: {
        type: Date,
        default: null,
    },

    nextCheckAt: {
        type: Date,
        default: null,
    },

    lastResponseTime: {
        type: Number,
        default: null,
    },
},
    { timestamps: true })

monitorSchema.index({ userId: 1, createdAt: -1 });
monitorSchema.index({ userId: 1, status: 1 });
monitorSchema.index({ isActive: 1, nextCheckAt: 1 });

const Monitor = mongoose.model('Monitor', monitorSchema)

export default Monitor