import { Request, Response } from "express";

import { IEvent } from "../helpers/paymentInterface.js";
import { paymentsData } from "../models/paymentModel.js";

export const paymentBalance = async (req: Request, res: Response) => {
    res.json(paymentsData);
};

export const paymentEvent = async (req: Request, res: Response) => {
    const { type, destination, amount } = req.body;

    const event: IEvent = {
        type,
        destination,
        amount,
    };

    paymentsData.push(event);

    res.status(201).json({ destination: { id: destination, balance: amount } });
};
