import personModel from '../entities/person';
import mongoConn from '../entities/mongo_db';
import validator from 'express-validator';
async function create(person) {
    validator.body('Name').isString().notEmpty().withMessage('Name is required').bail();
    validator.body('Age').isNumeric().withMessage('Age is required').bail();
    const errors = validator.validationResult(person);
    if (!errors.isEmpty()) {
        return errors.mapped();
    }

    let conn = await mongoConn();
    let result = null;
    try {
        result = await personModel.create(person);
    } catch (err) {
        console.error(err);
    }
    finally {
        conn.close();
    }
    return result;
}

async function getAll() {
    let conn = await mongoConn();
    try {
        let persons = await personModel.find({});
        return persons;
    }
    catch (err) {
        console.error(err);
        return [];
    } finally {
        conn.close();
    }
}

async function getById(id) {
    let conn = await mongoConn();
    try {
        let person = await personModel.findById(id);
        return person;
    }
    catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.close();
    }
}

async function update(id, person) {
    let conn = await mongoConn();
    try {
        let result = await personModel.findByIdAndUpdate(id, person);
        return result;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.close();
    }
}

export default {
    create,
    getAll,
    getById,
    update
};