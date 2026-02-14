import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("The MONGO_URI environment variable is not defined in the .env file");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`MongoDB connection error: ${error.message}`);
    } else {
      console.error(`Unexpected error while connecting to MongoDB:`, error);
    }
    
    process.exit(1);
  }
};

export default connectDB;