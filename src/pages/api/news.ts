import { NewsItem } from "@/components/CryptoNews.types";
import { domains } from "@/constants/cryptoNews";
import type { NextApiRequest, NextApiResponse } from "next";

const mockNews = [
  {
    title: "Chromia Fixes This: Arithmetic Overflow Hacks",
    description:
      "The recent hack of Poolz Finance, a cross-chain crowdfunding launchpad for Web3 projects, brought to light a persistent security vulnerability in the blockchain ecosystem: arithmetic overflow issues",
    url: "https://blog.chromia.com/chromia-fixes-arithmetic-overflow-hacks/",
    urlToImage:
      "https://blog.chromia.com/content/images/2023/03/2023-03-21-14.03.04.jpg",
  },
  {
    title: "Developer Experience Team - Monthly Update #3 (March 2023)",
    description:
      "Welcome to the March installment of our mid-month DevEx Team Update! To attract and retain developers, it is important to provide professional grade tools and documentation",
    url: "https://blog.chromia.com/developer-experience-team-monthly-update-3-march-2023/",
    urlToImage:
      "https://blog.chromia.com/content/images/2023/03/Developer-Experience-Team-UPDATES1920X1080--1-.jpeg",
  },
  {
    title: "Chromia Provider Spotlight: AM Cloud",
    description:
      "Based in Sweden, AM Cloud is a distributed storage and technology service provider that is leveraging blockchain technology and the IPFS protocol to build a decentralized data storage marketplace",
    url: "https://blog.chromia.com/chromia-provider-am-cloud-spotlight/",
    urlToImage: "https://blog.chromia.com/content/images/2023/03/AM-Cloud.png",
  },
  {
    title:
      "Building on Chromia: Leveraging Layer 0, 1, and 2 for Maximum Efficiency",
    description:
      "Explore Chromia's innovative approach to blockchain architecture and its applications as a Layer 0, Layer 1, and Layer 2 platform. Discover how Chromia leverages its unique design to achieve scalability, interoperability, and customization, and why it defies simple categorization",
    url: "https://blog.chromia.com/building-on-chromia-leveraging-layer-0-1-and-2-for-maximum-efficiency/",
    urlToImage:
      "https://blog.chromia.com/content/images/2023/03/2023-03-07-16.30.07.jpg",
  },
  {
    title: "Incubation Program 2023 Kick-Off Day Press Release",
    description:
      "Chromia Innovation Lab launched its second Incubation Program for 2023 to provide talented blockchain entrepreneurs, designers, and developers with the opportunity to prove their ideas and bring their startup visions to life!",
    url: "https://blog.chromia.com/incubation-program-2023-kick-off-day-press-release-2/",
    urlToImage: "https://blog.chromia.com/content/images/2023/03/IL_PR-4.png",
  },
  {
    title: "Chromia Monthly Update: February 2023",
    description:
      "Welcome to the second monthly update of 2023! These monthly updates are provided to track the progress of the Testnet Expansion Phase, while also keeping you informed about all the news from around the world of Chromia",
    url: "https://blog.chromia.com/chromia-monthly-update-february-2023/",
    urlToImage:
      "https://blog.chromia.com/content/images/2023/02/CHROMIA-UPDATE-FEB-2023.jpg",
  },
];

const newsCache: {
  news: NewsItem[];
} = {
  news: [],
};

function updateNewsCache(news: NewsItem[]) {
  newsCache.news = news;
  setTimeout(() => {
    newsCache.news = [];
  }, 1000 * 60 * 60 * 24);
}

type Data = {
  news: NewsItem[];
};

export default function handler(_: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === "development") {
    res.status(200).json({ news: mockNews });
  } else if (newsCache.news.length > 0) {
    res.status(200).json({ news: newsCache.news });
  } else {
    fetch(
      `https://newsapi.org/v2/everything?q=cryptocurrency&domains=${domains.join(
        ","
      )}&pageSize=${6}&apiKey=${process.env.NEWS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          const news = data.articles.map((article: NewsItem) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
          }));
          updateNewsCache(news);
          res.status(200).json({ news });
        } else {
          res.status(503).json({ news: [] });
        }
      });
  }
}
