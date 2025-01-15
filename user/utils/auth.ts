import { Request, Response, NextFunction } from 'express';
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";

import editor from "./data";

import { NotAuthError, NotFoundError } from "./errors";
import { CONSTANTS } from "./constants";
import { User } from "../model/user";

const KEY = process.env.AUTH_KEY || "supersecret";

export const createJSONToken = (username: string) => {
	return sign({ username }, KEY, { expiresIn: "1h" });
};

const validateJSONToken = (token: string) => {
	return verify(token, KEY);
};

export const isValidPassword = (password: string, storedPassword: string) => {
	return compare(password, storedPassword);
};

export const checkUsername = async (username: string): Promise<User> => {
	// check if there are even any existing user accounts
	const storedData = await editor.readData(CONSTANTS.USER_DATA_FILEPATH);
	if (!storedData.users || storedData.users.length === 0) {
		throw new NotFoundError("Could not find any users.");
	}
	// check if the user HAS an account among the existing ones by matching username
	const user = storedData.users.find((ev: User) => ev.username === username);
	if (!user) {
		throw new NotFoundError(
			"Could not find user with username " + username
		);
	}
	return user;
};

export const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log("checkAuthMiddleware()");
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
