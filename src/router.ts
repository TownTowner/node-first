import path from 'path';
import fs from 'fs';
import express from 'express';
import personService from './services/person_service';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

const fw = function (req, res, next) {
    console.log('局部中间件，请求中。。。');
    next();
};

router.get('/', fw, (req, res) => {
    res.set('header1', 'yo~ ho~');

    //请求对象,req
    // console.log(req.query);//路径参数
    // console.log(req.params);//动态路由参数
    // console.log(req.body);//请求体
    // console.log(req.headers);//请求头

    //响应对象，res
    res.status(201).send({ name: '小明1', age: 18 });
    res.end();
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    let persons = await personService.getAll();
    console.log('post,', persons);
    res.send(persons);
});

router.put('/', async (req, res) => {
    // console.log(req.body);
    let person = await personService.update('647af0ae5f1abe7f80924c50', { Name: "Tangtang1" });
    console.log('put,', person);
    res.send(person);
});

router.get('/api', (req, res) => {
    res.render('demo', { person: { username: "zhangsan", age: 18 } });
});

router.post('/file/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
        res.status(500).send({
            code: 500,
            msg: 'none files found'
        });
        return;
    }

    let file = <UploadedFile>req.files.file;
    let saveFolder = path.join(__dirname, './upload/');
    let savePath = saveFolder + file.name;

    if (!fs.existsSync(saveFolder)) {
        fs.mkdirSync(saveFolder);
    }

    file.mv(savePath, (err) => {
        if (err) {
            return res.status(500).send({ code: 500, msg: err });
        }
        return res.send({
            code: 200, msg: 'upload success',
            fileName: file.name
        });
    });

});

router.get('/file/download', (req, res) => {
    let file = {
        name: 'spoungebob.png',
        path: path.join(__dirname, './upload/spoungebob.png')
    };

    if (fs.existsSync(file.path)) {
        res.download(file.path);
        return;
    }

    res.send({ code: 404, msg: 'file not found:' + file.name });
});

export default router;