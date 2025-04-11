import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        company:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            required: true,
            enum: ["applied", "interview", "offer", "rejected"]
        },
        date:{
            type: Date,
            default: Date.now(),
        },
        link:{
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Application', applicationSchema);