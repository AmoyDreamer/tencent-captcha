# tencent-captcha
A simple library of captcha based on [tencentcloud-sdk-nodejs](https://github.com/TencentCloud/tencentcloud-sdk-nodejs/tree/3.0.268).

## Install
### Using npm
```bash
npm install tencent-captcha --save
```

## Usage

### Browser usage
You can see the client access CAPTCHA from this [document](https://cloud.tencent.com/document/product/1110/36841) for details.

#### Using TCaptcha JSSDK
```
<script src="https://ssl.captcha.qq.com/TCaptcha.js"></script>

```
#### Create instance of TencentCaptcha, include callback function
```
var T_Captcha = new TencentCaptcha('your_tencentcloud_application_ID', function(res) {
    //a callback from TencentCaptcha server
    if (res && res.ret == 0) {
        //success
        T_Captcha.destroy();
        //ajax request the relevant verification interface of the server.
        //you can see the following step [Node.js usage] to perform server-side validation.
    } else {
        //failure
    }
});
```
#### Man-machine verification enabled
```
T_Captcha.show();
```

### Node.js usage
You can see the validation interface of Tencent Captcha from this [document](https://cloud.tencent.com/document/product/1110/36926) for details.
```
const TencentCaptcha = require('tencent-captcha');
const captcha = new TencentCaptcha({
    secretId: 'your_tencentcloud_API_secretId',
    secretKey: 'your_tencentcloud_API_secretKey',
    appId: 'your_tencentcloud_application_ID',
    appSecretKey: 'your_tencentcloud_application_secretKey'
});
try {
    const res = await Captcha.validate(ticket, randstr, ip);
    if (res.CaptchaCode === 1) {
        //success
    } else {
        //failure
    }
} catch(e) {
    //catch tencentcloud-sdk-nodejs exception
}
```
You can get related secret ID and key from [Tencent Cloud Console](https://console.cloud.tencent.com/cam/capi).

## Method
### Create an instance of TencentCaptcha in server
new TencentCaptcha(options);
- options => tencentcloud-sdk-nodejs'config object.(required)

Options field description
- secretId => {String} tencentcloud API secretId.(required)
- secretKey => {String} tencentcloud API secretKey.(required)
- appId => {String} tencentcloud application ID.(required)
- appSecretKey => {String} tencentcloud application secretKey.(required)

### Using the following API to ensure the ticket is valid
captcha.validate(ticket, randstr, ip)
- ticket => {String} user authentication ticket from client's callback function.(required)
- randstr => {String} random string from client's callback function.(required)
- ip => {String} User ip.(required)

The Return value of this method is a promise, you can use [async-await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) synchronizing code. You can see data structure returned from the interface of Tencent Captcha by [document](https://cloud.tencent.com/document/product/1110/36926).

## License
tencent-captcha is [MIT licensed](https://github.com/AmoyDreamer/tencent-captcha/blob/master/LICENSE).
