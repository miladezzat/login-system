const express = require("express");

const placeModel = require("../models/place");

const router = express.Router();

router.post("/", (req, res, next) => {
    const { place_name, address, money_per_day, category } = req.body;
    const newPlace = new placeModel({
        place_name,
        address,
        money_per_day: +money_per_day,
        category
    });
    newPlace.save()
        .then(data => {
            console.log("data", data)
        })
        .catch(err => {
            console.log(err);
        })
    res.redirect("/user/profile");
});

module.exports = router;