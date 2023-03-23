This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API keys

To fetch the latest crypto news, we currently use only one API key from the NEWS_API_KEY in the .env.local file. If you would like to use this feature, you can get your own API key from [News API](https://newsapi.org/).

Please note that there is a limitation on the maximum number of API calls. Therefore, for the development mode case, we return mocked data from /api/news. To see the actual feature in action, you will need to build the project with the following command:

```bash
yarn build
# or
npm run build
# and then run the build with
yarn start
# or
npm run start
```

## Supported chains

- [x] Ethereum Mainnet
- [x] Binance Smart Chain Testnet
- [x] Goerli Testnet

## Input for token addresses

Although the token addresses for this app are currently hardcoded in an array, our application should support any ERC-20 tokens on the supported chains.
