import {NextFunction, Request, Response} from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization !== "abc123") {
        res.status(403).send({
            message: "Unauthorized"
        });
        return;
    }
    next();
}