import { SERVER_URL } from '@/config.js';

export class Request {
	constructor(url, method) {
		this.url = SERVER_URL + url;
		this.method = method;
	}

	get(query) {}

	post(data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url,
				data,
				method: this.method,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				}
			});
		});
	}
}
