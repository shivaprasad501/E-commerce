import express from "express"
import {placeorder,placeorderRazorpay,allorders,userOrders,updatestatus,verifyRazorpay} from '../controllers/ordercontroller.js'
import adminAuth from "../middleware/adminAuth.js"
import authuser from "../middleware/auth.js"

const orderRouter=express.Router()
 
//admin features
orderRouter.post('/list',adminAuth,allorders)
orderRouter.post('/status',adminAuth,updatestatus)

//payments features
orderRouter.post("/place",authuser,placeorder)
orderRouter.post("/razorpay",authuser,placeorderRazorpay)


//user features
orderRouter.post("/userorders",authuser,userOrders)
//verify razorpay 
orderRouter.post("/verifyRazorpay",authuser,verifyRazorpay)


export default orderRouter