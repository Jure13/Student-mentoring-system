import mongoose from "mongoose";

const izborni = {
    da: "da",
    ne: "ne"
};

const predmetModel = new mongoose.Schema({
    name:{type:String},
    kod:{type:String},
    program:{type:String},
    bodovi:{type:Number},
    sem_redovni:{type:Number},
    sem_vanredni:{type:Number},
    izborni:{type:String}
});

export const PredmetModel = mongoose.model("Predmet", predmetModel); 