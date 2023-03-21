import React, { useState, useEffect, FC } from "react";
import CryptoNewsCard from "./CryptoNews.Card";
import { NewsItem } from "./CryptoNews.types";
import { domains } from "@/constants/cryptoNews";
import { Grid } from "@mui/material";

const pageSize = 6;

export const CryptoNews: FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=cryptocurrency&domains=${domains.join(
          ","
        )}&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );
      const data = await response.json();
      console.log("data", data);
      setNews(data.articles);
    };
    fetchNews();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {news.map((newsItem) => (
        <Grid key={newsItem.title} item>
          <CryptoNewsCard newsItem={newsItem} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CryptoNews;
