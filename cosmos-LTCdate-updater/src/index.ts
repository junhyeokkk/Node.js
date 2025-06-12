import express from 'express';
import ltcRoutes from './routes/excel.route';
import blobRoutes from './routes/blob.route';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger'; 

const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', ltcRoutes);
app.use('/blob', blobRoutes);

app.use(errorHandler); // 에러처리 

app.listen(PORT, () => {
  console.log(`
        #############################################
           --> Server listening on port: ${PORT} <--   
        #############################################
    `);
});