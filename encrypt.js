const app = require('express')();
const nacl   = require('tweetnacl');
const util   = require('tweetnacl-util');
const scrypt = require('scryptsy');
const fs     = require('fs');
let texto;
let texto2;

app.get('/encrypt.js', function(req, res){
  res.sendFile('./encrypt.js', { root: __dirname });
});

texto = fs.readFileSync('sat.txt', 'utf-8'); 
console.log(texto);

texto2 = String(texto);

let password = "Node.js is cool";
console.log(texto2);
let secret_msg = util.decodeUTF8(texto2); 


let salt = nacl.randomBytes(16);
console.log("salt:", salt); 
let N = 16384; 
let r = 8; 
let p = 1; 
let key = scrypt(password, salt, N, r, p, nacl.secretbox.keyLength);
console.log(key);

let nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
console.log("nonce:", nonce);
let encrypted = nacl.secretbox(secret_msg, nonce, key);

encrypted = util.encodeBase64(encrypted);

fs.writeFile('file-cifrado.txt', encrypted, 'ascii', function(err) { 
  if (err) {
    console.log(err);
  } else {
    console.log("File saved!");
  }
});

app.post('/firmar', (req, res) =>
{
    console.log('Firma hecha');
});

