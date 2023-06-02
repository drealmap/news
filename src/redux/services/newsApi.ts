// Import the createApi and fetchBaseQuery functions from the redux toolkit query library
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a constant for the API key
const API_KEY = "d808a56d7b1e41978c5ff630955f4f82";

// Create an API slice using the createApi function
export const newsApi = createApi({
  // Specify the reducer path for the slice
  reducerPath: "newsApi",
  // Enable refetching on focus
  refetchOnFocus: true,
  // Define the base query function using the fetchBaseQuery function
  baseQuery: fetchBaseQuery({
    // Set the base URL for the API requests
    baseUrl: "https://newsapi.org/v2/",
  }),
  // Define the endpoints for the API slice using a builder callback
  endpoints: (builder) => ({
    // Define an endpoint for getting news by page offset and sources
    getNews: builder.query<User, { pageOffset: number; sources: string }>({
      // Define the query function for the endpoint
      query: ({ pageOffset, sources }) => {
        // Return an object with the URL, params and headers for the API request
        return {
          url: "everything",
          params: {
            // Calculate the page number based on the page offset
            page: pageOffset + 1,
            // Set the page size to 10
            pageSize: 10,
            // Set the date range to start from June 1st, 2023
            from: "2023-06-01",
            // Set the sources to filter by
            sources: sources,
          },
          headers: {
            // Set the API key header
            "x-api-key": API_KEY,
          },
        };
      },
    }),
    // Define an endpoint for getting news by title
    getNewsByTitle: builder.query<User, { title: string }>({
      // Define the query function for the endpoint
      query: ({ title }) => {
        // Return an object with the URL, params and headers for the API request
        return {
          url: "everything",
          params: {
            // Set the query parameter to the title
            q: title,
            // Set the page size to 10
            pageSize: 10,
            // Set the date range to start from June 1st, 2023
            from: "2023-06-01",
          },
          headers: {
            // Set the API key header
            "x-api-key": API_KEY,
          },
        };
      },
    }),
  }),
});

// Export the hooks for using the endpoints
export const { useGetNewsQuery, useGetNewsByTitleQuery } = newsApi;
