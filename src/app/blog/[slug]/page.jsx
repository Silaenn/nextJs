import { getPost, getUser } from "@/lib/data";
import Image from "next/image";
import { PostSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";

const getData = async (slug) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  } catch (error) {
    // Fallback to direct database call
    return await getPost(slug);
  }
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post?.title || "Blog Post",
    description: post?.desc || "Read our latest blog post",
  };
};

const PostAuthor = async ({ userId }) => {
  try {
    const user = await getUser(userId);
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-bgSoft">
          <Image
            src={user?.img || "/noavatar.png"}
            alt={user?.username || "Author"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium">{user?.username || "Anonymous"}</p>
          <p className="text-xs text-textSoft">Author</p>
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
};

const SinglePost = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);

  if (!post) {
    return (
      <div className="container-custom py-12">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-textSoft mb-6">
            The post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <a href="/blog" className="btn-primary inline-block">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Featured Image */}
        {post.img && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-textSoft">
            <Suspense fallback={<div className="h-10 w-32 bg-bgSoft rounded animate-pulse" />}>
              <PostAuthor userId={post.userId} />
            </Suspense>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-textSoft leading-relaxed mb-8 border-l-4 border-primary pl-6">
            {post.desc}
          </p>
          
          <div className="text-textSoft leading-relaxed space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
              veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-bgSoft">
          <a href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>
    </article>
  );
};

export default SinglePost;
