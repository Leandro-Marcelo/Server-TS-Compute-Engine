import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI;
    try {
        console.log("Connecting to DB...");

        await connect(DB_URI);
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;
