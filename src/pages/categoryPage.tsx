import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllNews } from "../services/newsService";
import NewsCard from "../components/newsCard";
import Navbar from "../components/navBar";
import ShimmerLoader from "../components/shimmerLoader";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAllNews(category || "general", "").then((data) => {
      setNews(data);
      setLoading(false);
    });
  }, [category]);

  return (
    <div>
  <Navbar setNews={setNews} setLoading={setLoading} />
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center my-4 capitalize">{category} News</h1>

    {loading ? (
      // Shimmer Loading Skeleton
      <div>
       <ShimmerLoader />
      </div>
    ) : news.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">No News Found</h2>
        <p className="text-gray-500 text-lg text-center">
          Try searching for something else or check back later.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title || article.webTitle}
            description={article.description || article.abstract || "No description available"}
            url={article.url || article.webUrl}
            image={article.urlToImage || article.image || "https://img.freepik.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg?semt=ais_hybrid"}
          />
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default CategoryPage;
