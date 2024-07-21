const chartdata= require("../model/struct");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();


exports.takeinput=async(req,res)=>{
   try{
    console.log("takeing input .................................................")
       const {name,password,email}=req.body;
       
       if(!name || !password ||!email){
      return  res.status(422)
        .json({
           
            error:"Plsee fill all the detail",
            
        })
       }

       

let hash;
try{
    hash=await bcrypt.hash(password,10)
}catch(err){
    return res.status(500).json({
       
        error:"error in hasing error"
    });

}
       const x=await chartdata.create({name,password:hash,email});
       res.status(200).json(
        {
            success:true,
            data:x,
            message:' Successfull Register'
        }
    );



   }
   catch(e){
    console.log(e);
    res.status(500)
    .json({
        success:false,
        error:"internal server error",
        message:e.message,
    })
   }
}



//  chartdata.findByIdAndUpdate(id,{$push:{value:value}}).then(()=>{
    // chartdata.findByIdAndUpdate(id,{$push:{label:label}}).then((e)=>console.log("second data is also"))
    // .catch((e) => console.log("lavel error",e))
exports.update=async(req,res)=>{
    try{
        const {id,label,value}=req.body;
        if(!label || !value){
           return res.status(422)
        .json({
            
            error:"Plse fill al the detail ",
        })

        }
        console.log("in in update function",label,value);
        if(label && value){
         let x= await chartdata.findByIdAndUpdate(id,{$push:{value:value}})
         let y= await chartdata.findByIdAndUpdate(id,{$push:{label:label}})
        //  await chartdata.findByIdAndUpdate(id,{$push:{value:value}}).then(()=>{
        //          chartdata.findByIdAndUpdate(id,{$push:{label:label}}).then((e)=>console.log("second data is also"))
        //          .catch((e) => console.log("lavel error",e))

        //     }
        
        
        res.status(200)
        .json({
            success:true,
            data: y,
            message:"Message enter succesfully",
        })

        
    
        
        
        
        

        }
        else{
            res.status(422)
        .json({
            success:false,
            data:"Plse feell all the detail",
            message:e.message,
        })

        }
        

    }
    catch(e){
        res.status(500)
        .json({
            success:false,
            data:"internal server error 2",
            message:e.message,
        })

    }
}


//  { $unset: { [`score.${indexToRemove}`]: 1, [`grades.${indexToRemove}`]: 1 } }
// );
exports.del=async(req,res)=>{
    const {id,index}=req.body;
    try{
      const x= await chartdata.findByIdAndUpdate(id,{$unset:{[`value.${index}`]:1,[`label.${index}`]:1}})
       const y=await chartdata.findByIdAndUpdate(
        id,
        { $pull: { label: null, value: null } }
      );
      res.status(200)
      .json({
          success:true,
          data: y,
          message:"Message enter succesfully",
      })

    }
    catch(e){
        res.status(500)
        .json({
            success:false,
            data:"error in updating",
            message:e.message,
        })

    }
}

// login fnctio
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(422).json({
                
                error:"please fill all the detail"
            })
        }
        console.log("ye nhi chale g is bar ")
             // check if email is register or not 
             let user=await chartdata.findOne({email:email});
            //  console.log("user k value",user);
             if(!user){
                return res.status(401).json({
                   
                    error:"user is not register",
                });
            }
            const payload={
                id:user._id,
                name:user.name
            }
            
                    // verify the password
        // console.log("yaa tak this hai");
        if(await bcrypt.compare(password,user.password)){
            // paswword mathch
        //    console.log("password match")
            let token=jwt.sign(payload,process.env.JWT_URL,{
                expiresIn:"2h",
               
        })
        console.log("yaha tak to thik hia ");
        const {_id,name}=user;
        return res.status(200).json({
            token,
            user:{_id,name},
            message:"login succesfull"

        })
        

        

        }
        else{
            console.log("password incorrect section")
            return res.status(422).json({
               
              
                error:'Incorrect Password',
            })
        }
    }
    catch(e){
        console.log("reason for error",e);
        return res.status(500).json({
            success:false,
          
            meassage:'Login fail! plse try again',
        })
       }

    
}

exports.find=async(req,res)=>{
    try{
        const {id}=req.body;
        let user=await chartdata.findById({_id:id})
         if(!user){
            return res.status(422).json({
                   error:"unable to find user"
            })
         }

         return res.status(200).json({
            
            data:user,
            message:"login succesfull"

        })
    }
    catch(e){
        console.log("reason for error",e);
        return res.status(500).json({
            success:false,
          
            meassage:'Unabe To find The User',
        })
       }
    }
exports.totalupdate=async(req,res)=>{
    try{
        // const id = localStorage.getItem("id");
        const {total,id}=req.body;
        const y=await chartdata.findByIdAndUpdate({_id:id},{total});
        console.log("total update function")
        res.status(200)
    .json({
        success:true,
        
        message:"server updates succesfully"
    });


    }
    catch(err){
        return res.status(500).json({
                   
            error:"user is not register total ",
        });

    }
}