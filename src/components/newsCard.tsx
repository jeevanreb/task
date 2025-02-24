import React from "react";

interface NewsProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

const NewsCard: React.FC<NewsProps> = ({ title, description, url, image }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="font-bold text-lg my-2">{title}</h3>
      <p className="text-gray-600 line-clamp-2">{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-green-600 mt-2 inline-block font-semibold">
        Read More →
      </a>
    </div>
  );
};

export default NewsCard;
