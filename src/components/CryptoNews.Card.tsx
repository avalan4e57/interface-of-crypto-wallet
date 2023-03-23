import styled from "@emotion/styled";
import { FC } from "react";
import { NewsItem } from "./CryptoNews.types";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  width: 300px;
  height: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 5px;
`;

const CardDescription = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const CardTitle = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

type CryptoNewsCardProps = {
  newsItem: NewsItem;
};

const CryptoNewsCard: FC<CryptoNewsCardProps> = ({ newsItem }) => {
  return (
    <a href={newsItem.url} target="_blank" rel="noreferrer">
      <CardContainer>
        <CardTitle>{newsItem.title}</CardTitle>
        <CardDescription>{newsItem.description}</CardDescription>
        <ImageContainer>
          <ImageStyled src={newsItem.urlToImage} alt="news-image" />
        </ImageContainer>
      </CardContainer>
    </a>
  );
};

export default CryptoNewsCard;
