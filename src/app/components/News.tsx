"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useGetNewsQuery } from "@/redux/services/newsApi";
import ListItem from "./ListItem";
import { MidSpinner } from "./Loader";

type ClickEvent = {
  selected: number;
};

export default function News() {
  const [posts, setPosts] = useState<Articles[]>([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [count, setcount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sources, setSources] = useState<string>(
    "bbc-news, cnn, fox-news, nbc-news, the-new-york-times,"
  );

  const {
    data: news,
    error,
    isLoading,
  } = useGetNewsQuery(
    { pageOffset: pageOffset, sources: sources },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const itemsPerPage = 10;

  const handlePageClick = (event: ClickEvent) => {
    console.log(event.selected);
    const newOffset = event.selected;
    setPageOffset(newOffset);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSources(e.target.value);
  };

  useEffect(() => {
    if (posts.length !== 0) {
      setPageCount(Math.ceil(count / itemsPerPage));
    }
  }, [pageOffset, count, setPageOffset, itemsPerPage, posts]);

  useEffect(() => {
    if (news) {
      console.log(news);
      setPosts(news.articles);
      setcount(news.totalResults);
    }
  }, [news, pageOffset, sources]);

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold dark:text-white/90">Breaking News</h2>

        <div className="relative">
          <select
            title="dropdown"
            onChange={handleChange}
            className=" appearance-none rounded-lg text-base py-3 lg:text-sm lg:leading-6 leading-7 border border-[#E6E7E9] px-7 outline-none"
          >
            <option value="bbc-news, cnn, fox-news, nbc-news, the-new-york-times">From all sources</option>
            <option value="bbc-news">BBC News</option>
            <option value="fox-news">Fox News</option>
            <option value="cnn">CNN</option>
            <option value="nbc-news">NBC News</option>
            <option value="the-new-york-times">The New York Times</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <MidSpinner />
      ) : (
        <ul className="w-full">
          {posts.map((post) => (
            <ListItem key={post.title} post={post} />
          ))}
        </ul>
      )}

      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageClassName="page-item p-1 "
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="pagination list-style-none flex justify-end items-center my-4 text-sm leading-4 font-grotesk gap-2 text-[#4A7BF3]"
        activeClassName="active rounded-[3px] bg-[#4A7BF3] bg-opacity-10"
        forcePage={pageOffset}
      />
    </section>
  );
}
