import LatestPost from "../Components/LatestPost";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-gray-900 text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          WELCOME TO BLOG
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
          A modern blogging platform sharing fresh perspectives on technology,
          creativity, books, and everyday life. Read, learn, and stay inspired.
        </p>
      </div>

      {/* Latest Posts Section */}
      <div className="w-full px-4 py-10 md:px-10">
        <LatestPost />
      </div>
    </>
  );
}
