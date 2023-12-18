// import mongoose from 'mongoose';

// let isConnected = false; // track the connection

// export const connectToDB = async () => {
//   mongoose.set('strictQuery', true);

//   if(isConnected) {
//     console.log('MongoDB is already connected');
//     return;
//   }

//   try {
//     const uri: string = process.env.MONGODB_URI !;
//     await mongoose.connect(uri, {
//       dbName: "steamable",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })

//     isConnected = true;
 
//     console.log('MongoDB connected')
//   } catch (error) {
//     console.log(error);
//   }
// }