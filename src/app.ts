import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

const app = express();

// app.set('view engine', 'ejs');
app.set('view engine', 'pug');
//不添加会找默认位置【views文件夹】
app.set('views', path.join(__dirname, 'views'));

//内置中间件
app.use(express.static('public'));//访问时不带【public】
app.use(bodyParser.json());//解析请求体数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(cors());

//中间件
const fw = function (req, res, next) {
    console.log('全局中间件，请求中。。。');
    next();
};
app.use(fw);

////为所有请求加上前缀
// app.use('/user',router);
app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});