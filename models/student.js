const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
    email: {
        type : string,
        required : true,
        unique: true,
        trim: true
    },
    password : {
        type : string,
        required: true
    },

    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
    },],
}, { timeStamps : true });

// hash passwrod before saving

studentSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err);
    }
});

//compare passwords

studentSchema.methods.comparePassword = async function (candidatepassword){
    return await bcrypt.compare(candidatepassword, this.password);
};

// Export the student model

const Studdent = mongoose.model("student", studentSchema);
module.exports = Studdent;