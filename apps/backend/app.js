import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoutes.js'
import cartRoute from './routes/cartRoutes.js'
import categoryRoute from './routes/categoryRoutes.js'
import blogRoute from './routes/blogRoute.js'
import publicRoute from './routes/publicRoutes.js'
import orderRoute from './routes/orderRoutes.js'
import userRoute from './routes/userRoutes.js'
import helmet from "helmet";

const app = express()

app.set("trust proxy", 1);

app.use(helmet());

//middlewares
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}))
app.use(cookieParser())

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400
}));

//health check 
app.get("/", (req, res) => {
  res.json({ message: "API is running..." })
})

// auth routes
app.use("/api/auth", authRoute)

// product routes
app.use("/api/products", productRoute)

// cart routes
app.use("/api/cart", cartRoute)

// category routes
app.use("/api/categories", categoryRoute)

// blog routes
app.use("/api/blogs", blogRoute)

// public routes
app.use("/api/public", publicRoute)

// order routes
app.use("/api/orders", orderRoute)

// user routes
app.use("/api/users", userRoute)

export default app
