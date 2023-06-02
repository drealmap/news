import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const API_KEY = "d808a56d7b1e41978c5ff630955f4f82";

export const newsApi = createApi({
  reducerPath: "newsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<User, { pageOffset: number, sources: string }>({
      query: ({ pageOffset, sources }) => {
        return {
          url: "everything",
          params: {
            page: pageOffset + 1,
            pageSize: 10,
            from: "2023-06-01",
            sources: sources,
          },
          headers: {
            "x-api-key": API_KEY,
          },
        };
      },
    }),
    getNewsByTitle: builder.query<User, { title: string }>({
      query: ({ title }) => {
        return {
          url: "everything",
          params: {
            q: title,
            pageSize: 10,
            from: "2023-06-01",
          },
          headers: {
            "x-api-key": API_KEY,
          },
        };
      },
    }),
  }),
});

export const { useGetNewsQuery, useGetNewsByTitleQuery } = newsApi;
