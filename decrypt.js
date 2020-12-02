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
let salt = new Uint8Array(  [ 108, 221, 228, 133,  87,
    255, 249, 163, 220, 211,
     50, 116, 128, 204, 179,
    108]);
let nonce = new Uint8Array([ 20,  37, 210, 119,  81, 144, 97,
    72, 132, 249,   0, 154, 210, 87,
   245,  88, 167,  73, 210,  51, 66,
    77, 114, 226]);

let N = 16384;
let r = 8; 
let p = 1; 
let pub_key = scrypt(password, salt, N, r, p, nacl.secretbox.keyLength);

let content = fs.readFileSync('file-cifrado.txt', 'ascii'); 
console.log(content);
let encrypted = util.decodeBase64(content);

let decrypted = nacl.secretbox.open(encrypted, nonce, pub_key); 
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
    alert('Firma eerónea');
    
}
