const app = require('express')();
const multer = require('multer');
const upload = multer({dest: './archivos'});
const fs = require('fs');
dir = 'cifrados';
dir2 = 'decifrados';

app.get('/',(req, res) =>{
    res.sendFile('main.html', {root: __dirname});
});

app.post('/subir', upload.single('archivo'), (req, res) =>
{
    console.log(req.file);
    res.send('Archivo subido');
});

app.post('/firmar', (root,res)=>{
    const encrypt = require('./encrypt.js');
    fs.readdir(dir, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            console.log(file);
            res.send(file);
        });
});
});

app.post('/verificar', (root, res)=>{
    const decrypt = require('./decrypt.js');
   fs.readdir(dir2, (err, files) =>{
       if(err){
           throw err;
       }
       files.forEach(file => {
        console.log(file);
        res.send(file);
   }); 
});
});

app.post
app.listen(3000, () => console.log('Servidor chidori'));
