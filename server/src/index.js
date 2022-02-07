import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { authRoutes, organizationRoutes, locationRoutes, deviceRoutes, userRoutes, unitRoutes, bayRoutes, notificationRoutes } from './api/routes/index.js';
import db from './api/models/index.js';
import { fileURLToPath } from 'url';
const { PORT } = process.env;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.on('uncaughtException', (err) => console.error(err, err.stack));
process.on('unhandledRejection', (err) => console.error(err, err.stack));

const app = express();

db.sequelize
  .sync()
  .then(() => console.log('Database connection succeeded'))
  .catch((err) => console.log('Err in db connection', err));

app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../static')));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('Started :method :url for :remote-addr at :date[iso]', { immediate: true }));
  app.use((req, res, next) => {
    if (Object.keys(req.body).length > 0) {
      const body = { ...req.body };
      if (body.password) body.password = '<REDACTED>';
      console.log(`${req.method} ${req.url} Body Debug\nParameters:`, JSON.stringify(body));
    }
    next();
  });
  app.use(morgan('Completed :method :url :status in :response-time ms - :res[content-length]'));
}

// routes
app.use('/api/auth', authRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/unit', unitRoutes);
app.use('/api/bay', bayRoutes);
app.use('/api/notification', notificationRoutes);
app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

// global error handler
app.use(globalErrorHandler);
const port = PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}.....`));
