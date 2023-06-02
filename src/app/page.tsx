// Import the News component from the components folder
import News from "./components/News";

// Define a constant for the revalidation time in seconds
export const revalidate = 10;

export default function Home() {
  // Return the JSX element for the main section of the page
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Latest Headlines from around the world
      </p>
      <News />
    </main>
  );
}
