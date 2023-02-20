import { Request, Response } from "express";

import { schema } from "../helpers/schemaValidation.js";
import { IEvent } from "../helpers/paymentInterface.js";
import PaymentService from "../services/paymentService.js";
import { paymentsData } from "../models/paymentModel.js";

export const paymentReset = async (req: Request, res: Response) => {
    try {
        // Instance of the class
        const paymentService = new PaymentService();

        // Clean the database
        paymentService.CleanDataBase();

        // Show the status and message
        res.status(200).json("OK");
    } catch (err) {
        res.status(404).send(err);
    }
};

export const paymentBalance = async (req: Request, res: Response) => {
    const { account_id: accountId } = req.query;

    // Start the total account balance
    let totalBalance: Number | Promise<Number> = 0;

    try {
        // Instance of the class
        const paymentService = new PaymentService();

        // Check if: the account exists
        paymentService.CheckAccountExists(paymentsData, accountId);

        // Return the total account balance
        totalBalance = paymentService.GetTotalBalance(
            paymentsData,
            accountId,
            totalBalance
        );

        // Send the status and respective balance response
        res.status(200).json(totalBalance);
    } catch (err) {
        res.status(404).json(totalBalance);
    }
};

export const paymentEvent = async (req: Request, res: Response) => {
    const { type, origin, destination, amount } = req.body;

    // Start the total account balance
    let totalBalance: Number | Promise<Number> = 0;

    // Create payment event
    const event: IEvent = {
        type,
        amount,
        ...(destination && { destination }),
        ...(origin && { origin }),
    };

    // Validate body schema
    try {
        await schema.validateAsync(event);
    } catch (err) {
        res.status(400).send("Invalid body schema validation");
        return;
    }

    // Payment operation
    try {
        // Instance of the class
        const paymentService = new PaymentService();

        // Check the type order
        switch (type) {
            case "deposit":
                // Push to the database
                paymentsData.push(event);

                // Return the total account balance
                totalBalance = paymentService.GetTotalBalance(
                    paymentsData,
                    destination,
                    totalBalance
                );

                // Send the status and event response
                res.status(201).json({
                    destination: { id: destination, balance: totalBalance },
                });

                break;
            case "withdraw":
                // Check if: the account exists
                paymentService.CheckAccountExists(paymentsData, origin);

                // Push to the database
                paymentsData.push(event);

                // Return the total account balance
                totalBalance = paymentService.GetTotalBalance(
                    paymentsData,
                    origin,
                    totalBalance
                );

                // Send the status and event response
                res.status(201).json({
                    origin: { id: origin, balance: totalBalance },
                });
                break;
            case "transfer":
                // Divide the origin and destionation amounts
                let totalBalanceOrigin: Number | Promise<Number> = 0;
                let totalBalanceDestination: Number | Promise<Number> = 0;

                // Check if: the account origin and destination exists
                paymentService.CheckAccountExists(paymentsData, origin);

                // Push to the database
                paymentsData.push(event);

                // Return the total origin account balance
                totalBalanceOrigin = paymentService.GetTotalBalance(
                    paymentsData,
                    origin,
                    totalBalance
                );

                // Return the total destination account balance
                totalBalanceDestination = paymentService.GetTotalBalance(
                    paymentsData,
                    destination,
                    totalBalance
                );

                // Send the status and event response
                res.status(201).json({
                    origin: { id: origin, balance: totalBalanceOrigin },
                    destination: {
                        id: destination,
                        balance: totalBalanceDestination,
                    },
                });
                break;
            default:
                res.status(404).send(
                    "Invalid type. Only deposit, withdraw and transfer are allowed"
                );
                return;
        }
    } catch (err) {
        res.status(404).json(totalBalance);
    }
};
