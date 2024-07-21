const express=require("express");
const router=express.Router();

const {takeinput,update,totalupdate,del,login,find}=require("../controller/input");

router.post("/details",takeinput);
router.put("/chartdata",update);
router.put("/del",del);
router.post("/login",login);
router.put("/find",find);
router.put("/total",totalupdate);


module.exports=router;
