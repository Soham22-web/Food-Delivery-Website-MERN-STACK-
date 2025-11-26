import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACE ORDER
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "INR",
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery fee
        line_items.push({
            price_data: {
                currency: "INR",
                product_data: { name: "Delivery Charges" },
                unit_amount: 4000,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend_url}/verify?orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log("Error placing order:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// VERIFY ORDER
const verifyOrder = async (req, res) => {
    const { orderId, session_id } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === "paid") {
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true, status: "Paid" },
                { new: true }
            );

            const orderToSave = {
                orderId: updatedOrder._id,
                items: updatedOrder.items,
                amount: updatedOrder.amount,
                address: updatedOrder.address,
                payment: updatedOrder.payment,
                status: updatedOrder.status,
                date: updatedOrder.date,
            };

            await userModel.findByIdAndUpdate(
                updatedOrder.userId,
                { $push: { cartData: orderToSave } }
            );

            return res.json({ success: true, order: updatedOrder });
        }

        return res.json({ success: false, message: "Payment not completed" });
    } catch (error) {
        console.log("Error verifying order:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// GET USER ORDERS
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user.id }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// =============================
// ADMIN: GET ALL ORDERS
// =============================
const listAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching all orders" });
    }
};

// =============================
// ADMIN: UPDATE ORDER STATUS
// =============================
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" });
    }
};

export { 
    placeOrder, 
    verifyOrder, 
    userOrders, 
    listAllOrders, 
    updateOrderStatus 
};
