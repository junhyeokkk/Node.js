import express from 'express';
import ltcRoutes from './routes/ltc.route';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', ltcRoutes);

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});