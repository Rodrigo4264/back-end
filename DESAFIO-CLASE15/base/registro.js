import { initMongoDB } from "./conection.js";
import { UserModel } from "./schema.js";

const user = {
    first_name: 'Tomas',
    last_name: 'Ponce',
    age: 37
}

const createUser = async (obj) =>{
    await UserModel.create(obj);
}

const test = async() => {
    await initMongoDB();
    await createUser(user);
    console.log('usuario creado!');
}

test()