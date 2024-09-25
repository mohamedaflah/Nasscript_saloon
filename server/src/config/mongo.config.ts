import mongoose from "mongoose";
mongoose
  .connect(String(process.env.MONGODB_URI), { dbName: "estate" })
  .then(() => {
    console.log(`Mongodb connected`);
  })
  .catch((er) => {
    console.log(`Mongodb err ${er}`);
  });
