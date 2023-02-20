import { Request, Response, NextFunction } from "express";

export const parametersExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Verify if: Request query exists
    if (Object.keys(req.query).length === 0) {
        res.status(400).send("No parameters sent");
        return;
    }

    next();
};
