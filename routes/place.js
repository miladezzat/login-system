const express = require("express");

const placeModel = require("../models/place");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/filesUploaded')
    },
    filename: function (req, file, cb) {
        let extension = file.mimetype;
        extension = extension.substring(
            extension.indexOf('/') + 1,
            extension.length
        )
        cb(null, file.originalname + Date.now() + '.' + extension)
    }
})

const upload = multer({ storage: storage })


router.post("/",isAdmin, upload.any(), (req, res, next) => {
    const { place_name, address, money_per_day, category, description } = req.body;
    let card_icon, photos = [];
    if (req.files) {
        card_icon = req.files[0].path.slice(7);

        for (let index = 1; index < req.files.length; index++) {
            const file = req.files[index];
            photos.push(file.path.slice(7));
        }
    }
    const newPlace = new placeModel({
        place_name,
        address,
        card_icon,
        photos,
        description,
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

router.get("/edit/:place_id",isAdmin, async (req, res, next) => {
    const { place_id } = req.params;
    const place = await placeModel.findById(place_id);
    res.render("user/profile", { place });
});

router.post("/edit/:place_id",isAdmin, async (req, res, next) => {
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

router.get("/delete/:id",isAdmin, async (req, res, next) => {
    const id = req.params['id'];
    await placeModel.deleteOne({ _id: id });
    res.redirect("/user/profile")
});

//search

router.get("/recommend", async (req, res, next) => {
    const { budget, category } = req.query;

    let results, recommended;
    if (!budget && !category) {
        results = await placeModel.find();
        recommended = results;
    } else {
        let pattern = new RegExp(category, 'i')
        results = await placeModel.find({ category: { $regex: pattern} });

        recommended = await results.map(result => {
            let duration = budget / result.money_per_day;
            return {
                _id: result._id,
                place_name: result.place_name,
                card_icon: result.card_icon,
                address: result.address,
                description: result.description,
                duration,
            }
        })
    }
    console.log(results)
    res.render("search", { results: recommended });
})



module.exports = router;