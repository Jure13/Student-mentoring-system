import mongoose from "mongoose";

const upisModel = new mongoose.Schema({
    student_id:{type:Number},
    predmet_id:{type:Number},
    status:{type:String}
});

export const UpisModel = mongoose.model("Upis", upisModel); 