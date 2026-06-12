import { Order } from "../models/order.schema.js";
import { User } from "../models/user.js";

export const getQuickStats = async (req, res) => {
  try {
    // Total Revenue: sum of totalPrice for paid orders
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Active Orders: count of orders with status pending, processing, or shipped
    const activeOrders = await Order.countDocuments({
      status: { $in: ['pending', 'processing', 'shipped'] }
    });

    // Total Users: count of all users in the database
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        activeOrders,
        totalUsers
      },
      message: "Quick stats fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching quick stats:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const revenueOverview = async (req, res) => {
  try {
    const { range = '30d' } = req.query;

    let startDate = new Date();
    let groupByFormat = "%Y-%m-%d"; // default group by day
    
    if (range === '7d' || range === '7days') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (range === '12m' || range === '1y') {
      startDate.setMonth(startDate.getMonth() - 12);
      groupByFormat = "%Y-%m"; // Group by Year-Month
    } else {
      // Default: 30 days
      startDate.setDate(startDate.getDate() - 30);
    }

    const overviewData = await Order.aggregate([
      { 
        $match: { 
          isPaid: true, 
          createdAt: { $gte: startDate } 
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: groupByFormat, date: "$createdAt" } },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);

    // Format the data for the frontend chart (e.g., [{ name: '2023-10-01', total: 1500 }])
    const formattedData = overviewData.map(item => ({
      name: item._id,
      total: item.revenue
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
      message: "Revenue overview fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching revenue overview:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};