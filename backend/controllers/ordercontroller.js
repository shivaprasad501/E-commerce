
import ordermodel from "../models/ordermodel.js"
import usermodel from "../models/usermodel.js"
import razorpay from 'razorpay'

//global variables

const currency = 'inr'
const deliveryCharge = 10
//gateway intializing
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})
//placing order using  COD method
const placeorder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentmethod: 'COD',
            payment: false,
            date: Date.now()
        }
        const newOrder = new ordermodel(orderData)
        await newOrder.save()

        await usermodel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'order placed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}
//placing order using  razorpay method

const placeorderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentmethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new ordermodel(orderData)
        await newOrder.save()

        const option = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        await razorpayInstance.orders.create(option, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })

            }
            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {

        const { userId, razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await ordermodel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await usermodel.findByIdAndUpdate(userId, { cartData: {} })
            return res.json({ success: true, message: "payment successfull" })
        } else {
            res.json({ success: false, message: "payment failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//allorders data for admin panel

const allorders = async (req, res) => {
    try {
        const orders = await ordermodel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
//user order data for forntend  

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await ordermodel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }



}
//update order status from admin panel 

const updatestatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await ordermodel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'status updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }





}

export { placeorder, placeorderRazorpay, allorders, userOrders, updatestatus, verifyRazorpay }