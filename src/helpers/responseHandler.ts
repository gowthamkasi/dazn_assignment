import { Response } from 'express';

export const responseHandler = ({
  res,
  status = 200,
  msg = '',
  data = {},
  result = true,
}: {
  res: Response;
  status?: number;
  msg?: string;
  data?: Record<string, unknown>;
  result?: boolean;
}) => {
  res.status(status).send({ result, status, msg, data });
};

export const errorHandler = ({
  res,
  status = 500,
  err = 'error',
  data = {},
  result = false,
}: {
  res: Response;
  status?: number;
  err?: string | Error;
  data?: Record<string, unknown>;
  result?: boolean;
}) => {
  console.error(res);
  res.status(status).send({
    result,
    msg: err instanceof Error ? err.message : err,
    data,
  });
};
