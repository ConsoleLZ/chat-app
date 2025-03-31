import { SERVER_URL } from '@/config.js';
import { buildQueryString } from './utils';

export class Request {
	constructor(url, method) {
		this.url = SERVER_URL + url;
		this.method = method;
	}

	get(params) {
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

	uploadFile(filePath, name, formData = {}, files) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: this.url,
				filePath,
				name,
				files,
				formData,
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
