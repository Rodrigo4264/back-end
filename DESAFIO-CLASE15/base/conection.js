import mongoose from 'mongoose';
// const server = '127.0.0.1:27017';
// const databasename = 'backend';

const connectionString = 'mongodb+srv://crausazr:Colmillo123@cluster0.fvhewcg.mongodb.net/Cluster0?retryWrites=true&w=majority';


export const initMongoDB = async () => {
    try {
    //     await mongoose.connect(`mongodb://${server}/${databasename}`,{
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true
    // })

        await mongoose.connect(connectionString,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })



        console.log('Conectado a MongoDB!');
    } catch (error) {
        console.log(error);
    }
}