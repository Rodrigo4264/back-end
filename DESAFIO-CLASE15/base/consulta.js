import { initMongoDB } from "./conection.js";
import { UserModel } from "./schema.js";

const test = async() => {
    await initMongoDB();
    const consulta1 = await UserModel.find({});
    console.log(consulta1);
}

test()