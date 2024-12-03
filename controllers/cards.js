const cards = require("../models/userCard")

//adding card
exports.addCard = async(req, res) => {
    try{
        const{cardNumber, expiration, cvv, cardHolderName}=req.body;
        if(!cardNumber || !expiration || !cvv || !cardHolderName){
          return  res.status(400).json({
            success: false,
            message:"All fields  are required"
          })
        }
        const card = await cards.create({
            cardNumber,
            expiration,
            cvv,
            cardHolderName
        })
        return res.status(201).json({
            success: true,
            message:"card added successfully",
            card
        })
    }catch(error) {
        return res.status(400).json({
            success: false,
            message:"Something went wrong while adding card",
            error:error.message
        })

    }

}

// deleting card
exports.deleteCard = async(req, res) =>{
    try {
        const {id} = req.params;
        const deletedCard = await cards.findByIdAndDelete({_id: id})
        if(!deletedCard) {
            return res.status(400).json({
                success: false,
                message:"Card not found"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Card deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Something went wrong while deleting card",
            error:error.message
        })
        
    }
}

//getting all cards
exports.getAllCards = async(req, res) => {
    try {
        const card = await cards.find()
        if(!card || card.length === 0) {
            return res.status(200).json({
                success: true,
                message:"No card found",
                card: []
            })
        }
        return res.status(200).json({
            success: true,
            message:"fetching all cards successfully",
            card
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            "message":"Something went wrong while getting cards",
            error:error.message
        })
        
    }
}

// updating card
exports.updateCard = async (req, res) => {
    try {
        // Extracting the id from req.params
        const { id } = req.params;

        // Using the id to find and update the card
        const updatedCard = await cards.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are enforced
        });

        if (!updatedCard) {
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Updated card successfully",
            updatedCard,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
