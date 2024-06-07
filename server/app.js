import connection_db from "./database/connection_db.js";
import express from 'express';
import {PORT} from './config.js';
import cors from 'cors';
import ProductsModel from "./models/productsModel.js";
import productsRouter from './routes/productsRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', productsRouter);

try {
    await connection_db.authenticate();
    console.log('Connection has been established successfully.');

    ProductsModel.sync();
    console.log('Products Model connected correctly 📋');

   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }
   
   export const server = app.listen(PORT, () => {
    console.log(`La API se esta escuchando en el puerto http://localhost:${PORT}`);
});

export default app;   