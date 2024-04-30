import MiniProfile from "./MiniProfile";
import Posts from "./Posts";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
      {/* Posts (left) */}
      <section className="md:col-span-2">
        <Posts />
      </section>

      {/* profile (right) */}
      <section className="hidden md:col-span-1 md:inline-grid">
        <MiniProfile />
      </section>
    </main>
  );
};

export default Feed;
