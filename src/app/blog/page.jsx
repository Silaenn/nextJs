import { getPosts } from "@/lib/data";
import PostCard from "@/components/postCard/postCard";
import { PostCardSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";

const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <div className="container-custom py-12 animate-fadeIn">
      {/* Header */}
      <div className="mb-12 text-center animate-scaleIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Case Studies</h1>
        <p className="text-textSoft max-w-2xl mx-auto">
          Explore how we help our clients turn their biggest ideas into successful digital realities.
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-textSoft">
          <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense fallback={
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          }>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
