import React, { useState, useEffect, FC } from "react";
import CryptoNewsCard from "./CryptoNews.Card";
import { NewsItem } from "./CryptoNews.types";
import { Grid } from "@mui/material";

export const CryptoNews: FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    let ignore = false;
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news").then((res) => res.json());
        if (!ignore) {
          setNews(response.news);
        }
      } catch (error) {
        console.log(error);
        setNews([]);
      }
    };
    fetchNews();
    return () => {
      ignore = true;
    };
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
