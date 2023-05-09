// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Error from 'models/Error';
import * as weatherAPI from 'http/weatherAPI';
import Forecast from 'models/Forecast';

const handler = async (req: NextApiRequest, res: NextApiResponse<Forecast | Error>): Promise<void> => {
  if (req.method === 'GET') {
    if (req.query.city !== undefined) {
      try {
        const city = req.query.city as string;

        const response = await weatherAPI.forecastByCity(city);

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
    } else if (req.query.lat !== undefined && req.query.lon !== undefined) {
      try {
        const lat = req.query.lat as string;
        const lon = req.query.lon as string;

        const response = await weatherAPI.forecastByCoordinates(parseFloat(lat), parseFloat(lon));

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
      res.status(400).json({ error: 'Invalid params.' });
    }
  } else {
    res.setHeader('Allow', 'GET').status(405).json({
      error: 'Wrong HTTP method. Check "Allow" header field to verify the methods supperted by the target resource',
    });
  }
};

export default handler;
