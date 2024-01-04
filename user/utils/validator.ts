import { User } from "../model/user";

/* Validation of new signups */
const isValidText = (text: string, minLength = 1) => {
    return text && text.trim().length >= minLength
}


const isValidAlias = (alias: string, existingUsers: User[], errors: any) => {
	console.log('Checking alias...');
    if (!isValidText(alias)) {
		errors.alias = "Invalid alias";
	} else if (existingUsers.length >= 1) {
		// if there is at least 1 existing user
		// check if the alias is already in-use
		const user = existingUsers.find(
			(user) => user.alias === alias
		);
        
		if (user) {
			console.log(user);
			console.log('Found existing alias!');
			errors.alias = "Alias is already in use";
		} else {
			console.log('Valid alias!');
		}
	}
}

const isValidUsername = (username: string, existingUsers: User[], errors: any) => {
	console.log('Checking username...');
    if (!isValidText(username)) {
		errors.username = "Invalid username";
	} else if (existingUsers.length >= 1) {
		// if there is at least 1 existing user
		// check if the username is already in-use
		const user = existingUsers.find(
			(user) => user.username === username
		);
		if (user) {
			console.log(user);
			console.log('Found existing username!');
			errors.username = "Username already exists";
		} else {
			console.log('Valid username!');
		}
	}
}

const isValidPassword = (password: string, errors: any) => {
	console.log('Checking password...');
    if (!isValidText(password)) {
		// no strict password checking for now
		errors.password = "Invalid password";
	}
}

export const isValidUser = (user: User, existingUsers: User[]) => {
    const errors = {};
	isValidAlias(user.alias, existingUsers, errors);
    isValidUsername(user.username, existingUsers, errors);
    isValidPassword(user.password, errors);
    return errors;
}

/* Validation of game data (TBC) */