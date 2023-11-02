const studentModel = require('../models/studentModels');
const { validPhone } = require('../validation/valid');
const {valiEmail,validPass,validMobile} = require('../validations/')
const jwt = require("jsonwebtoken")
const createStudent = async function(req, res) {
    try {
        let student = req.body;
        let { fname, lname, email, password, mobile, address } = student;
        //validation
        if (!fname || !lname || !email || !password || !address || !mobile) {
            return res.send({ message: "Please provide all information!" });
        }
        if(!validEmail) return res.send({message : "Please enter valid email"})
        if(!validPass)return res.send({message : "Please enter valid password"})
        if(!validMobile)return res.send({message : "Please enter valid mobile"})

        //unique validation
        let uniqueEmail = await studentModel.findOne({email})
        if(!uniqueEmail) return res.send({message : "Email already exists"})

        let uniquePhone = await studentModel.findOne({mobile})
        if(!uniquePhone) return res.send({message : "mobile already exists"})

        let createStu = await studentModel.create(student);
        return res.send({ message: createStu });
    } catch (error) {
        console.log(error);
    }
}

//Login Api

let loginstudent = async (req,res)=>{
    try{
        let data = req.body
        let {email,password}=data 
        if (!email || !password){
            return res.status(400).send({message : "Please provide all information !"})
        }
        let matchStudent = await studentModel.findOne({email,password})
        if(matchStudent){
            return res.status(200).send({msg :"Student Registered"})
        }
        const token = jwt.sign({
            studentId:matchStudent._id.tostring(),
        },"mernstack",
        {
            expiresIn:"12000sec"
        }
        )
        return res.status(200).send({status:true,msg:"Student Logged In successfully",data:token})

    }catch (error){
        return res.status(500).send({status : false,msg : "Internal server error"})

    }

    }
module.exports = {createStudent,loginstudent}
