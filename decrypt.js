const nacl   = require('tweetnacl');
const util   = require('tweetnacl-util');
const scrypt = require('scryptsy');
const fs     = require('fs');
const app = require('express')();
const alert = require('alert');

app.get('/',(req, res) =>{
    res.sendFile('main.html', {root: __dirname});
});

let password = "Node.js is cool";
let salt = new Uint8Array([55,   2, 152, 241, 116,
    93, 125,  42,   3, 217,
   124, 191, 108, 156, 132,
   144]);
let nonce = new Uint8Array([  105, 195, 155, 202, 210, 101,
    33, 228, 212,  58,  65, 149,
   166, 224, 232,  86, 131,  58,
   220, 165,  99, 227,  86, 240]);

let N = 16384;
let r = 8; 
let p = 1; 
let key = scrypt(password, salt, N, r, p, nacl.secretbox.keyLength);

let content = fs.readFileSync('file-cifrado.txt', 'ascii'); 
console.log(content);
let encrypted = util.decodeBase64(content);

let decrypted = nacl.secretbox.open(encrypted, nonce, key); 
let decrypted2 = util.encodeUTF8(decrypted);
console.log(decrypted2);

let original = fs.readFileSync('sat.txt','utf-8');
let original2 = String(original);
console.log(original2);

if(String(original2) == String(decrypted2)){
    console.log('Firma verificada');
    alert('Firma Verificada');
    
}
else{
    console.log('Firma errónea');
    
}
