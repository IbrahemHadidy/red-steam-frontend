/* eslint-disable no-useless-escape */
export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

export const nameRegex = /^[a-zA-Z0-9_]{3,}$/;

export const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export function validateEmail(email: string) {
	return emailRegex.test(email);
}

export function validatePassword(password: string) {
	return passwordRegex.test(password);
}

export function validateName(name: string) {
	return nameRegex.test(name);
}

export function validatePhone(phone: string) {
	return phoneRegex.test(phone);
}
