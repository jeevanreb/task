import axios from "axios";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

// Fetch from NewsAPI.org
const fetchNewsAPI = async (category: string, query: string, date: string) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${query}&category=${category}&country=us&apiKey=${NEWS_API_KEY}`
    );
    return response.data.articles || [];
  } catch (error) {
    console.error("NewsAPI error:", error);
    return [];
  }
};

// Fetch from The Guardian
const fetchGuardianNews = async (category: string) => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/search?tag=${category}/${category}&api-key=${GUARDIAN_API_KEY}&show-fields=all`
    );
    return response.data.response.results || [];
  } catch (error) {
    console.error("Guardian API error:", error);
    return [];
  }
};

// Fetch from The New York Times
const fetchNYTimesNews = async (category: string) => {
  try {
    const response = await axios.get(
      `http://api.mediastack.com/v1/news?access_key=${NYT_API_KEY}&keywords=${category}`
    );
    return response?.data?.data || [];
  } catch (error) {
    console.error("NYTimes API error:", error);
    return [];
  }
};

// Function to fetch news from preferred sources
export const fetchAllNews = async (category: string = "technology", query: string = "", date: string = "") => {
  // Retrieve user preferences from localStorage
  const preferredSources = JSON.parse(localStorage.getItem("preferredSources") || '["newsapi", "guardian", "nyt"]');
  const apiCalls: Promise<any[]>[] = [];

  // Fetch news only from selected sources
  if (preferredSources.includes("newsapi")) apiCalls.push(fetchNewsAPI(category, query, date));
  if (preferredSources.includes("guardian")) apiCalls.push(fetchGuardianNews(category));
  if (preferredSources.includes("nyt")) apiCalls.push(fetchNYTimesNews(category));

  const results = await Promise.allSettled(apiCalls);
  // Return only successful responses
  return results
    .filter((result) => result.status === "fulfilled") // Keep successful requests
    .flatMap((result: any) => result.value); // Merge all successful responses into one array
};
