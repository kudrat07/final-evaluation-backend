const express = require("express")
const router = express.Router();

const {signUp, logIn, getUserDetail, updateUser} = require("../controllers/user")
const {allFoodItems} = require("../controllers/foodCategory")
const {createAddress, getAllAddress, deleteAddress, updateAddress}= require("../controllers/address");
const {addCard,deleteCard, getAllCards,updateCard} = require("../controllers/cards")

router.post("/signup", signUp);
router.post("/login", logIn);


router.get("/allItems", allFoodItems);
router.get("/address", getAllAddress);
router.get("/profile", getUserDetail);
router.put("/profile/:id", updateUser)

router.post("/address", createAddress);
router.delete("/address/:id", deleteAddress);
router.put("/address/:id", updateAddress);

router.get("/card", getAllCards)
router.post("/card", addCard)
router.delete("/card/:id", deleteCard)
router.put("/card/:id", updateCard)








module.exports = router;