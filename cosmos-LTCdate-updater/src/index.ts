import express from 'express';
import ltcRoutes from './routes/ltc.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', ltcRoutes);

app.use(errorHandler); // 마지막에 등록

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});