const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("./../middleware/auth");

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */

 router.get('/list', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.shoppinglist);
    } catch(e) {
        res.send({message: "Error in Fetching User's shopping list"});
    }
});

router.post('/add', auth, async(req, res) => {
    try {        
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        User.findOneAndUpdate({user},{$push: {shoppinglist: item}}, {new: true}, function(err, User) {
            if (err) {
                console.log(err);
                res.json({msg: "auth error"})
            } else {
                res.json({
                    shoppinglist: User.shoppinglist
                })
            }
        })
    } catch(e) {
        res.send({message: "Error adding to shopping list"});
    }
});

router.delete('/delete', auth, async(req,res) => {
    try {
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        User.findOneAndUpdate({user},{$pull: {shoppinglist: item}}, {new: true}, function(err, User) {
            if (err) {
                console.log(err);
                res.json({msg: "auth error"})
            } else {
                res.json({
                    shoppinglist: User.shoppinglist
                })
            }
        })
    } catch(e) {
        res.send({message: "Error deleting from shopping list"});
    }
})

module.exports = router;