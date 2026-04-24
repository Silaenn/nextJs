import { getPosts } from "@/lib/data";
import PostCard from "@/components/postCard/postCard";
import { PostCardSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 3600;

const PostList = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="col-span-full text-center py-20 sm:py-32 glass rounded-2xl sm:rounded-[3rem] border-white/5">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted">
          No artifacts discovered.
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

const BlogPage = () => {
  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[60%] sm:w-[40%] h-[40%] bg-accent/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="max-w-xs sm:max-w-2xl lg:max-w-4xl mb-14 sm:mb-20 lg:mb-24 reveal-up">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent mb-4 sm:mb-6 block">
            Our Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.95] mb-6 sm:mb-8">
            Turning{" "}
            <span className="text-white italic">Concepts</span>{" "}
            Into Case Studies.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-textSoft/80 leading-relaxed font-medium">
            Explore our successful collaborations and technical masterworks.
            Every pixel tells a story of innovation and precision.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <Suspense
            fallback={
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;