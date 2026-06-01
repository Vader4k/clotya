import dotenv from "dotenv";
import { connectDB } from './config/db.js'
import app from './app.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})
