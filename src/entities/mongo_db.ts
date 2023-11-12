import mongoose from 'mongoose';

function mongoConn() {

    /* 连接到数据库  mongoose.connect('mongodb://端口号/数据库');     */
    mongoose.connect('mongodb://localhost:27017/person_db');

    // 如果有用户名与密码的连接方式 mongoose.connect('mongodb://用户名:密码@地址:端口号/数据库');
    // mongoose.connect('mongodb://root:111111@localhost:27017/person_db');

    // 3：设置回调
    // 3.1 设置连接成功的回调
    // 设置连接成功的回调： once 事件回调函数只执行一次
    mongoose.connection.once('open', () => {
        console.log('db.js中的连接成功');

        // success && success();
    });
    // 3.2 设置连接错误的回调
    mongoose.connection.on('error', () => {
        console.log('连接错误');
    });
    // 3.3 设置连接关闭的回调
    return mongoose.connection.on('close', () => {
        console.log('连接关闭');
    }).asPromise();
}

// function close() {
//     mongoose.connection.close();
// }

export default mongoConn;// { connect, close };