import mongoose, { Mongoose } from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;
interface Cached {
  conn: Mongoose | null;
  promise: Promise<any> | null;
}
if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached: Cached = (global as any).mongoose;

if (!cached) {
  let cached: Cached = (global as any).mongoose;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    if (DATABASE_URL) {
      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        return mongoose;
      });
    } else {
      throw new Error(
        "Please define the DATABASE_URL environment variable inside .env.local"
      );
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
