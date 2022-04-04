import mongoose from "mongoose";

const role = {
    student: "student",
    metnor: "mentor"
};

const status = {
    none: "NONE",
    redovni: "redovni",
    vanredni: "vanredni"
};

const korisnikModel = new mongoose.Schema(
    {
    email:{type:String, unique: true, dropDups: true, required:true},
    password:{type:String, required: true},    
    role:{type: String, default: role.student},
    status:{type:String, default: status.none}
    }
);

export const KorisnikModel = mongoose.model("Korisnik", korisnikModel); 
