import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";

import { NotAuthError } from "./errors";

const KEY = process.env.AUTH_KEY || "supersecret";

const validateJSONToken = (token: string) => {
	return verify(token, KEY);
};

export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === "OPTIONS") {
		return next();
	}
	if (!req.headers.authorization) {
		console.log("NOT AUTH. AUTH HEADER MISSING.");
		return next(new NotAuthError("Not authenticated."));
	}
	const authFragments = req.headers.authorization.split(" ");

	if (authFragments.length !== 2) {
		console.log("NOT AUTH. AUTH HEADER INVALID.");
		return next(new NotAuthError("Not authenticated."));
	}
	const authToken = authFragments[1];
	try {
		const validatedToken = validateJSONToken(authToken);
		console.log("[checkAuthMiddleware]: Validated token = " + validatedToken);
		// req.token = validatedToken;
	} catch (error) {
		console.log("NOT AUTH. TOKEN INVALID.");
		return next(new NotAuthError("Not authenticated."));
	}
	next();
};
