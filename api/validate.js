module.exports = {
	user(user) {
		const filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const validEmail = filter.test(user.email);

		const validPassword = typeof user.password == 'string' &&
						user.password.trim() != '' &&
						user.password.trim().length >= 6;
		return validEmail && validPassword;
	}
}
