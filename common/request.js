const baseUrl = 'https://www.gxsd.mobi'
const request = (url = '', date = {}, type = 'GET', header = {
	"content-type": "application/json ",
	"token":uni.getStorageSync('login').token
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
			dataType: 'json',
		}).then((response) => {
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			reject(err)
		})
	});
}
export default request
