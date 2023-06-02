"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { useGetNewsByTitleQuery } from "@/redux/services/newsApi";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MidSpinner } from "@/app/components/Loader";

export default async function Post({
  params,
}: {
  params: { postTitle: string };
}) {
  const { postTitle } = params;

  const {
    data: post,
    error,
    isLoading,
  } = useGetNewsByTitleQuery(
    { title: postTitle },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [posts, setPosts] = useState<Articles | null>(null);

  useEffect(() => {
    if (post) {
      console.log(post);
      setPosts(post.articles[0]);
    }
  }, [post, postTitle]);


  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      {isLoading ? (
        <MidSpinner />
      ) : (
        <>
          {" "}
          <section className="w-full mx-auto">
            <Image
              className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black mx-auto mt-8"
              src={posts?.urlToImage as string}
              width={300}
              height={300}
              alt=""
              priority={true}
            />
          </section>
          <h1 className="text-3xl mt-4 mb-0">{posts?.title}</h1>
          <p className="mt-0">{posts?.description}</p>
          <article>
            <section>{posts?.content}</section>
            <p>
              <Link href="/">← Back to home</Link>
            </p>
          </article>
          <div className="flex flex-col items-end">
            <p className="text-sm mt-1">{posts?.author}</p>
            <p className="text-sm mt-1">
              {moment(posts?.publishedAt).format("LL")}
            </p>
          </div>
        </>
      )}
    </main>
  );
}
