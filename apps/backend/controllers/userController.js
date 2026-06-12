import { Order } from "../models/order.schema.js";
import { User } from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/utils.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      status: "success",
      orders,
      message: "orders fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      streetAddress,
      apartment,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (streetAddress) updates.streetAddress = streetAddress;
    if (apartment) updates.apartment = apartment;
    if (city) updates.city = city;
    if (state) updates.state = state;
    if (postalCode) updates.postalCode = postalCode;
    if (country) updates.country = country;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true },
    ).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found" });
    }

    res.status(200).json({
      status: "success",
      user,
      message: "profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ status: "fail", message: "email already in use" });
    }
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "please provide current and new password",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found" });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "invalid current password" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        status: "fail",
        message: "password must be at least 6 characters long",
      });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      orders,
      message: "orders fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order)
      return res
        .status(404)
        .json({ status: "fail", message: "order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({
      status: "success",
      order,
      message: "order updated successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await User.countDocuments();
    res.status(200).json({
      status: "success",
      users,
      pagination: {
        totalUsers: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit: limit,
      },
      message: "all users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "internal server error" });
  }
};
