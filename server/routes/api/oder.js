const express = require("express");
const router = express.Router(); 
const Order = require("../../models/Oders");

// router.get("/", async (req, res) => {
//     try{
//         let item = await Item.find();
//         return res.status(200).send(item);
//     }catch(ex){
//         console.error(ex);
//         return res.status(500).send("Server Error");
//     }
    
// });

router.get("/cart", async (req, res) => {
    try{
        let order = await Order.find();
        return res.status(200).send(order);
    }catch(ex){
        console.error(ex);
        return res.status(500).send("Server Error");
    }
    
});

router.put("/cartedit/:id", async (req, res) => {

    console.log(req);

    try {
    console.log(req.params.id);
        let requestedID =req.params.id;
        let order = await Order.findById(requestedID);
        if (!order) {
            return res.status(404).send("item you are looking for does not exist");
        }
 
    order = await Order.findByIdAndUpdate(requestedID, req.body)
    return res.status(200).send(order);
    
    } catch(ex) {
        console.error(ex);
        return res.status(500).send("Server Error");
    }

});

module.exports = router;