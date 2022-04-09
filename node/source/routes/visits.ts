import express from 'express';
import controller from '../controllers/visits';

const router = express.Router();

router.get('/visits', controller.getVisitData);

export = router;
