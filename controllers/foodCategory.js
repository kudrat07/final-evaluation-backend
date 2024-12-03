const FoodCategory = require("../models/foodCategorySchema")
require("dotenv").config();



exports.allFoodItems = async (req, res) => {
    try {
        const categories = await FoodCategory.find();

        // Check if no categories are found
        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: "Categories found successfully",
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
