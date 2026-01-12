import express from 'express';
import routes from './api/routes';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 注册API路由
app.use('/api', routes);

// 健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误', error: err.message });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`工作流智能体服务器已启动，监听端口 ${PORT}`);
  console.log(`API文档: http://localhost:${PORT}/api`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
});