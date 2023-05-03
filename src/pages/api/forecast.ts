// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Error from 'models/Error';
import * as httpClient from 'http/client';
import Forecast from 'models/Forecast';

const handler = async (req: NextApiRequest, res: NextApiResponse<Forecast | Error>): Promise<void> => {
  if (req.method === 'GET') {
    try {
      const city = req.query.city as string;

      const response = await httpClient.forecast(city);

      if (response.status >= 200 && response.status < 300) {
        res.json(response.data);
      } else {
        console.error(response);

        res.status(500).json({ error: 'Oops! Something went wrong.' });
      }
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
  } else {
    res.setHeader('Allow', 'GET').status(405).json({
      error: 'Wrong HTTP method. Check "Allow" header field to verify the methods supperted by the target resource',
    });
  }
};

export default handler;
