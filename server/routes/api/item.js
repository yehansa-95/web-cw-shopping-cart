const express = require("express");
const router = express.Router(); 
const Item = require("../../models/Item");

router.get("/",async (req,res) => { 
    try{
        let item = await Item.find();
        return res.status(200).send(item);
    }catch(ex){
        console.error(ex);
        return res.status(500).send("Server Error");
    }
    
});

router.get("/:id",async (req,res) => {
    try {
        let requestedID =req.params.id;
    let item = await Item.findById(requestedID);
    if (!item){
        return res.status(404).send("item you are looking for does not exist");
    }
    
    item = await item.save();
    return res.status(200).send(item);
    } catch (ex) {
        console.error(ex);
        return res.status(500).send("Server Error");
    }
});


module.exports = router;