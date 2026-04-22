import { getPosts } from "@/lib/data";
import PostCard from "@/components/postCard/postCard";
import { PostCardSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";

export const revalidate = 3600; // revalidate every hour

// This component handles the data fetching
const PostList = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="col-span-full text-center py-32 glass rounded-[3rem] border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">No artifacts discovered.</p>
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
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Section - Renders instantly */}
        <div className="max-w-4xl mb-24 reveal-up">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-6 block">Our Showcase</span>
            <h1 className="heading-xl leading-[0.9] mb-8">
                Turning <span className="text-white italic">Concepts</span> Into Case Studies.
            </h1>
            <p className="text-xl text-textSoft/80 leading-relaxed font-medium">
                Explore our successful collaborations and technical masterworks. 
                Every pixel tells a story of innovation and precision.
            </p>
        </div>

        {/* Posts Grid - Shows skeletons while PostList fetches data */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          }>
            <PostList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
