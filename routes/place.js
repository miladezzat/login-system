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

router.get("/edit/:place_id", async (req, res, next) => {
    const { place_id } = req.params;
    const place = await placeModel.findById(place_id);
    res.render("user/profile", { place });
});

router.post("/edit/:place_id", async (req, res, next) => {
    const { place_id } = req.params;
    const { place_name, address, money_per_day, category } = req.body;

    await placeModel.findOneAndUpdate({ _id: place_id }, {
        $set: {
            place_name,
            address,
            money_per_day,
            category
        }
    })
    res.redirect("/user/profile");
});

router.get("/delete/:id", async (req, res, next) => {
    const id = req.params['id'];
    await placeModel.deleteOne({ _id: id });
    res.redirect("/user/profile")
});



module.exports = router;