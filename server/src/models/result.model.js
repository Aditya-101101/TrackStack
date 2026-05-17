import mongoose from "mongoose"

const resultSchema = new mongoose.Schema({
    monitorId: {
        type: mongoose.Schema.ObjectId,
        ref: "Monitor",
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ["UP", "DOWN"],
        required: true,
    },

    statusCode: {
        type: Number,
        default: null,
    },

    responseTime: {
        type: Number,
        default: null,
    },

    errorMessage: {
        type: String,
        default: null,
    },

    checkedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

resultSchema.index({ monitorId: 1, checkedAt: -1 });
resultSchema.index({ userId: 1, checkedAt: -1 });


const Result = mongoose.model("Result", resultSchema)

export default Result