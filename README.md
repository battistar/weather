# Weather

Weather is a simple weather forecast app built with NextJS and powered by [WeatherAPI.com](https://www.weatherapi.com/) API's.

The app is available on [https://weather-chi-puce.vercel.app/](https://weather-chi-puce.vercel.app/).

## Development

You can setup and run the application in your local environment in different ways:

### Docker

Move in dev folder and make executable `run.sh`:

```shell
sudo chmod +x run.sh
```

Then you can build the Docker image and run the container by:

```shell
./run.sh start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

To teardown the environment run:

```shell
./run.sh stop
```

### npm

First setup [nvm](https://github.com/nvm-sh/nvm), then move in the main folder, where the `.nvmrc` file are in, and run:

```shell
nvm use
```

Now you can run the application in dev mode:

```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to show it in the browser.

### Environment variables

To provide data from [WeatherAPI.com](https://www.weatherapi.com/), put your API key inside `.env.local` file, or similar, in this way:

```
API_KEY={your_api_key}
```

## Deployment

Every push on the main branch, trigger a GitHub action that check the code validity and push a new version on Vercel.
