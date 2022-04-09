import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import uniqArray from '../helpers/uniqArray';

const stateData = require('../config/stateData.json');

const NAMESPACE = 'GetVisitData';

const getVisitData = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({
      data: uniqArray(stateData)
    });
  } catch (e: any) {
    logging.error(NAMESPACE, e.message);
    return res.status(e.response?.status).json({
      message: e.message
    });
  }
};

export default { getVisitData };
