import mongoose from "mongoose";

const connection = {
  isConnected: false,
  isConnecting: false,
};

/**
 * Connect to MongoDB with retry logic
 * @returns {Promise<void>}
 */
export const connectToDb = async () => {
  // Return early if already connected
  if (connection.isConnected) {
    console.log("✓ Using existing MongoDB connection");
    return;
  }

  // Prevent multiple connection attempts
  if (connection.isConnecting) {
    console.log("⏳ MongoDB connection in progress...");
    return;
  }

  connection.isConnecting = true;

  try {
    if (!process.env.MONGO) {
      throw new Error("MONGO environment variable is not set");
    }

    const options = {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    };

    const db = await mongoose.connect(process.env.MONGO, options);
    connection.isConnected = db.connections[0].readyState;
    connection.isConnecting = false;
    
    console.log(`✓ MongoDB connected successfully to: ${db.connection.host}`);
  } catch (error) {
    connection.isConnecting = false;
    connection.isConnected = false;
    
    console.error("✗ MongoDB connection error:", error.message);
    
    // Re-throw only operational errors
    if (error.name === "MongoServerError") {
      throw new Error(`Database connection failed: ${error.message}`);
    }
    
    throw error;
  }
};

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
export const disconnectFromDb = async () => {
  try {
    if (connection.isConnected) {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log("✓ MongoDB disconnected");
    }
  } catch (error) {
    console.error("✗ MongoDB disconnection error:", error.message);
    throw error;
  }
};

/**
 * Get connection status
 * @returns {Object} Connection status
 */
export const getConnectionStatus = () => ({
  isConnected: connection.isConnected,
  isConnecting: connection.isConnecting,
  readyState: mongoose.connections[0]?.readyState || 0,
});

/**
 * Health check for database connection
 * @returns {Promise<boolean>}
 */
export const checkDbHealth = async () => {
  try {
    await connectToDb();
    const state = mongoose.connections[0]?.readyState;
    return state === 1; // 1 = connected
  } catch (error) {
    console.error("✗ Database health check failed:", error.message);
    return false;
  }
};
