const jwt = require('jsonwebtoken');

// token的加解密
function tokenManager() {
	const key = 'CA40A984709D0EA83626DAE4012E1451';

	// 加密
	function encryptToken(data, time) {
		const token = jwt.sign(data, key, { expiresIn: time });
		return token;
	}
	// 解密
	function decryptToken(token) {
		try {
			return jwt.verify(token, key);
		} catch (error) {
			return false;
		}
	}

	return {
		encryptToken,
		decryptToken
	};
}

module.exports = {
	tokenManager
};
