/**
 * @desc A simple library of captcha based on tencentcloud-sdk-nodejs.
 * @author Allen Liu
 * @document: https://cloud.tencent.com/document/product/1110/36926
 */
const tencentcloud = require('tencentcloud-sdk-nodejs');

class TencentCaptcha {
    //initialize Tencent captcha Server config.
    constructor(options) {
        this._secretId = options.secretId || '';//tencentcloud API secretId
        this._secretKey = options.secretKey || '';//tencentcloud API secretKey
        this._appId = options.appId || '';//tencentcloud application ID
        this._appSecretKey = options.appSecretKey || '';//tencentcloud application SecretKey
    }
    /**
     * @param {String} ticket User authentication ticket from client's callback function
     * @param {String} randstr Random string from client's callback function
     * @param {String} ip user ip
     */
    async validate(ticket, randstr, ip) {
        return new Promise((resolve, reject) => {
            const CaptchaClient = tencentcloud.captcha.v20190722.Client;
            const models = tencentcloud.captcha.v20190722.Models;
            const Credential = tencentcloud.common.Credential;
            const ClientProfile = tencentcloud.common.ClientProfile;
            const HttpProfile = tencentcloud.common.HttpProfile;
            let cred = new Credential(this._secretId, this._secretKey);
            let httpProfile = new HttpProfile();
            httpProfile.endpoint = 'captcha.tencentcloudapi.com';
            let clientProfile = new ClientProfile();
            clientProfile.httpProfile = httpProfile;
            let client = new CaptchaClient(cred, '', clientProfile);
            let req = new models.DescribeCaptchaResultRequest();
            let params = JSON.stringify({
                CaptchaType: 9,
                Ticket: ticket,
                UserIp: ip,
                Randstr: randstr,
                CaptchaAppId: this._appId,
                AppSecretKey: this._appSecretKey
            });
            req.from_json_string(params);
            client.DescribeCaptchaResult(req, function(errMsg, res) {
                //exception
                if (errMsg) {
                    reject(`tencent-captcha catch exception: ${errMsg}`);
                }
                resolve(res);
            });
        })
    }
}
module.exports = TencentCaptcha;
