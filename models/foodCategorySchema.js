const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    objects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        img_url: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        cost: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: "foodCategory" }
);

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);
module.exports = FoodCategory;
