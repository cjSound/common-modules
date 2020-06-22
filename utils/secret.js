/*
 * @Author: 曹捷
 * @Date: 2020-06-22 16:15:46
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-06-22 16:57:23
 * @Description:AES加解密
//说明：
//  1.如果加密解密涉及到前端和后端，则这里的key要保持和后端的key一致
//  2.AES的算法模式有好几种（ECB,CBC,CFB,OFB），所以也要和后端保持一致
//  3.AES的补码方式有两种（PKS5，PKS7），所以也要和后端保持一致
//  4.AES的密钥长度有三种（128,192,256，默认是128），所以也要和后端保持一致
//  5.AES的加密结果编码方式有两种（base64和十六进制），具体怎么选择由自己定，但是加密和解密的编码方式要统一
 *  */
const CryptoJS = require('crypto-js');  //引用AES源码js

// const key = CryptoJS.enc.Utf8.parse("1234567887654321");  //十六位十六进制数作为密钥
var key = CryptoJS.enc.Utf8.parse("UJKhgTfCPi==Obit");//十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
// export function Decrypt(word) {
//     let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
//     let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//     let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//     let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//     return decryptedStr.toString();
// }

// //加密方法
// export function Encrypt(word) {
//     let srcs = CryptoJS.enc.Utf8.parse(word);
//     let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//     return encrypted.ciphertext.toString().toUpperCase();
// }

/*加密*/
export function aesEncode(str) {
    var encryptedData = CryptoJS.AES.encrypt(str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.toString();
}

/*解密*/
export function aesDecode(encryptedStr) {
    var encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedStr);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
}