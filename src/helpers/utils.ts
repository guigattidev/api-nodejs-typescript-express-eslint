import { IData } from "../helpers/paymentInterface.js";

export const getTotalBalance = (
    paymentsData: IData[],
    accountId: string | any,
    totalBalance: number | any
): Number => {
    // Percurse all the array elements and add or retrive the amount of value
    paymentsData.forEach((element) => {
        if (
            (element.type === "deposit" && element.destination === accountId) ||
            (element.type === "transfer" && element.destination === accountId)
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
};

export const checkAccountExists = (
    paymentsData: IData[],
    accountId: string | any
): void => {
    // Check if: account exists
    const accountExists = paymentsData.some(
        (element) => element.destination === accountId
    );

    // Verify if: The account exists in the data
    if (!accountExists) {
        throw new Error("Account does not exist");
    }
};
