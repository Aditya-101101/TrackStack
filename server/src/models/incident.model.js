import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    monitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monitor",
        required: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    status: {
        type: String,
        enum: ["OPEN", "RESOLVED"],
        default: "OPEN",
        index: true,
    },

    startedAt: {
        type: Date,
        default: Date.now,
    },

    resolvedAt: {
        type: Date,
        default: null,
    },

    reason: {
        type: String,
        default: "Monitor is down",
    },


}, { timestamps: true })

incidentSchema.index({ monitorId: 1, status: 1 });
incidentSchema.index({ userId: 1, startedAt: -1 });
incidentSchema.index({ userId: 1, status: 1 });

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;