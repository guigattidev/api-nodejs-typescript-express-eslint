import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Library API",
            version: "1.0.0",
            description:
      'This is a REST API application made with Express. Used to build a Fintech API.',
        }
    },
    apis: ["./src/controllers/*.ts"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Import routes
import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/paymentRouter.js";

// Dot env config init
dotenv.config();

// Config express and port vars
const app: Application = express();
const PORT: string | number = process.env.APP_PORT || 8080;

// Middleware cors and json body parser
app.use(cors());
app.use(express.json());

// Middleware api
app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});

export default app;
