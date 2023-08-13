import { paymentsData } from "../models/paymentModel.js";

import { IData } from "../helpers/paymentInterface.js";

export default class PaymentService {
    CleanDataBase(): void {
        paymentsData.length = 0;
    }

    AddEventDataBase(event: IData): void {
        paymentsData.push(event);
    }

    GetTotalBalance(
        accountId: string | any,
        totalBalance: number | any
    ): number {
        // Percurse all the array elements and add or retrive the amount of value
        paymentsData.forEach((element) => {
            if (
                (element.type === "deposit" &&
                    element.destination === accountId) ||
                (element.type === "transfer" &&
                    element.destination === accountId)
            ) {
                totalBalance += element.amount;
            } else if (
                (element.type === "withdraw" && element.origin === accountId) ||
                (element.type === "transfer" && element.origin === accountId)
            ) {
                totalBalance -= element.amount;
            }
        });

        // Return the total balance
        return totalBalance;
    }

    CheckAccountExists(accountId: string | any): void {
        // Check if: account exists
        const accountExists = paymentsData.some(
            (element) => element.destination === accountId
        );

        // Verify if: The account exists in the data
        if (!accountExists) {
            throw new Error("Account does not exist");
        }
    }
}
