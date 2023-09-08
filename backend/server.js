import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./db/Database.js";

// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: "backend/config/.env",
    });
}

// connect db
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});
