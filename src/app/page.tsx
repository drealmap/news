import News from "./components/News";

export const revalidate = 10;

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Latest Headlines from around the world
        {/* <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Dave</span>.
        </span> */}
      </p>
      <News />
    </main>
  );
}
