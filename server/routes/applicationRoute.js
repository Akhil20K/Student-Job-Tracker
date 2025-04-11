import express from 'express';
import applicationController from '../controller/applicationCtrl.js';
const applicationRouter = express.Router();

// Routes for transactions
applicationRouter.post('/add', applicationController.add);
applicationRouter.get('/list', applicationController.lists);
applicationRouter.get('/filter-list', applicationController.getFilteredApplications);
applicationRouter.put('/update/:id', applicationController.update);
applicationRouter.delete('/delete/:id', applicationController.delete);

export default applicationRouter;