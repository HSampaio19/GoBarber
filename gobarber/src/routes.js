import Router from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer'
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/update', UserController.update);

routes.post('/files', upload.single('file'),  FileController.store);

routes.post('/Appointments', AppointmentController.store);

routes.get('/Appointments', AppointmentController.index);

routes.get('/providers', ProviderController.index);

routes.get('/schedule', ScheduleController.index);

export default routes;
