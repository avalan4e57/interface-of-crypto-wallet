import { render, screen } from "@testing-library/react";
import CryptoNewsCard from "./CryptoNews.Card";
import { NewsItem } from "./CryptoNews.types";

describe("CryptoNewsCard", () => {
  it("should render correctly", () => {
    const newsItem: NewsItem = {
      url: "url",
      description: "description",
      title: "title",
      urlToImage: "urlToImage",
    };
    render(<CryptoNewsCard newsItem={newsItem} />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "urlToImage");
    expect(screen.getByRole("img")).toHaveAttribute("alt", "news-image");
    expect(screen.getByRole("link")).toHaveAttribute("href", "url");
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noreferrer");
  });
});
