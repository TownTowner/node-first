import mongoose from 'mongoose';

export interface IUser {
    Name: string;
    Code: string;
}

// 使用mongoose需要先定义Schema，可以理解为表结构的定义，此操作的对象应该和数据库表（集合）的字段一样
const personSchema = new mongoose.Schema<IUser>({
    Name: String,
    // age : Number,
    // _id: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    Code: String
});
//创建模型
var personModel = mongoose.model<IUser>('Person', personSchema, "persons");

export default personModel;