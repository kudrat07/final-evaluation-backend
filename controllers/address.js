const Address = require("../models/userAddress.js");

exports.createAddress = async (req, res) => {
  try {
    const { state, city, pinCode, phoneNumber, fullAddress } = req.body;

    // checking if all fields are filled by user
    if ((!state || !city, !pinCode, !phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //creating a address
    const address = await Address.create({
      state,
      city,
      pinCode,
      phoneNumber,
      fullAddress,
    });
    //sending a success response
    return res.status(200).json({
      success: true,
      message: "Address created successfully",
      address,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// getting all the address
exports.getAllAddress = async (req, res) => {
  try {
    const address = await Address.find();
    if (!address || address.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No address found",
        address: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetched all address successfully",
      address,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong while fetching all address",
      error: error.message,
    });
  }
};

//delete a address
exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAddress = await Address.findByIdAndDelete({ _id: id });
    if (!deletedAddress) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      deletedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.json(400).json({
      success: false,
      message: "Something went wrong while deteting user",
      error: error.message,
    });
  }
};

// Updating the address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Address updated",
      updateAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong while updating address",
      error: error.message,
    });
  }
};
