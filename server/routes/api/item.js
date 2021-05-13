const express = require("express");
const router = express.Router(); 
const Item = require("../../models/Item");
const Order = require('../../models/Oders')

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
        // console.log.(req.params);
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




router.post("/addtocart/:id", async (req, res) => {
    
    if (!req.params.id) {
        return res.status(400).send("No Product Found")
    } 

    let item = new Order({
        pid : req.params.id,
        name: req.body.name ,
        description: req.body.description,
        price: req.body.price,
        imageData: req.body.imageData,
        qty : req.body.qty
    });

    try{
        let order = await item.save();
        return res.send({
            success: true,
            message: 'item added successfully',
            order
        });
    }catch(err){
        return res.status(400).send(err.message);
    }
    
});

module.exports = router;
