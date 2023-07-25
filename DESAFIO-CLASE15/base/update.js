import { initMongoDB } from "./conection.js";
import { UserModel } from "./schema.js";

const test = async() => {
    await initMongoDB();
    const update1 = await UserModel.findByIdAndUpdate(
        '64bc62ce837ba9941ff4671b',
        {admin: true},
        {new: true}
        
        )
    console.log (update1);
}

test()