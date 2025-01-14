import { SERVER_URL } from '@/config.js';
import {buildQueryString} from './utils'

export class Request {
	constructor(url, method) {
		this.url = SERVER_URL + url;
		this.method = method;
	}

	get(params) {
		console.log(this.url + buildQueryString(params))
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.url + buildQueryString(params),
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
