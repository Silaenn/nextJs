import { getPost, getUser } from "@/lib/data";
import Image from "next/image";
import { PostSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";
import Link from "next/link";

export const revalidate = 3600;

const getData = async (slug) => {
  try {
    return await getPost(slug);
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
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
      <div className="flex items-center gap-3 sm:gap-4 p-2 pr-4 sm:pr-6 glass rounded-full border-white/5">
        <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-accent/20 shadow-xl flex-shrink-0">
          <Image
            src={user?.img || "/noavatar.png"}
            alt={user?.username || "Author"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-0.5">
            Lead Architect
          </p>
          <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
            {user?.username || "Anonymous"}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
};

const PostContent = async ({ slug }) => {
  const post = await getData(slug);

  if (!post) {
    return (
      <div className="container-custom py-24 sm:py-32">
        <div className="text-center py-14 sm:py-20 glass rounded-2xl sm:rounded-[3rem] border-white/5 px-6">
          <h1 className="text-2xl sm:text-3xl font-black italic tracking-tighter mb-4">
            ARTIFACT NOT FOUND.
          </h1>
          <p className="text-textSoft mb-8 sm:mb-10 font-medium text-sm sm:text-base">
            The data has been purged or moved from this sector.
          </p>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto reveal-up">

      {/* Featured Image */}
      {post.img && (
        <div className="relative aspect-video rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden mb-10 sm:mb-14 lg:mb-20 glass border-white/5 shadow-2xl group bg-[#080808]">
          {/* Blur backdrop */}
          <Image
            src={post.img}
            alt=""
            fill
            className="object-cover blur-3xl scale-110 opacity-30"
          />
          {/* Sharp foreground */}
          <div className="relative w-full h-full p-4 sm:p-8 md:p-16">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.03)_0%,transparent_70%)] pointer-events-none" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
        </div>
      )}

      {/* Content Layout */}
      <div className="max-w-4xl mx-auto">

        {/* Header Metadata */}
        <header className="mb-10 sm:mb-14 lg:mb-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
            <div className="h-[1px] w-8 sm:w-12 bg-accent flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent">
              Artifact Journal
            </span>
          </div>

          {/* Title — main fix */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter text-white mb-8 sm:mb-12 lg:mb-16 italic uppercase break-words">
            {post.title}
          </h1>

          {/* Author + Date */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
            <PostAuthor userId={post.userId} />
            <div className="flex items-center gap-3 sm:gap-4 glass px-4 sm:px-6 py-3 sm:py-4 rounded-full border-white/10">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] flex-shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-textSoft">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Body Content */}
        <div className="relative pl-4 sm:pl-8 md:pl-16">
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-accent/50 via-accent/10 to-transparent" />

          <p className="text-lg sm:text-2xl md:text-3xl text-white font-medium leading-[1.4] mb-10 sm:mb-14 lg:mb-16 italic opacity-95 tracking-tight">
            {post.desc}
          </p>

          <div className="prose prose-invert prose-base sm:prose-lg max-w-none text-textSoft/80 sm:text-xl leading-relaxed space-y-6 sm:space-y-10 font-medium">
            <p>
              Precision engineering meets creative vision. Our approach to this artifact
              was defined by rigorous technical standards and an unwavering commitment
              to aesthetic excellence.
            </p>
            <p>
              Every digital structure within this project was architected to sustain
              high-performance interaction while maintaining the cinematic fidelity
              that defines our elite workspace.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 sm:mt-20 lg:mt-32 pt-10 sm:pt-14 lg:pt-16 border-t border-white/5 flex justify-between items-center gap-4">
          <Link href="/blog" className="flex items-center gap-3 sm:gap-6 group">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full glass border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-500 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent mb-0.5 sm:mb-1">
                Navigation
              </span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-accent transition-colors tracking-tight">
                Return to Library
              </span>
            </div>
          </Link>

          <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-muted">
            SECURED ARCHIVE SECTOR 01
          </div>
        </div>

      </div>
    </div>
  );
};

const SinglePost = ({ params }) => {
  const { slug } = params;
  return (
    <article className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden bg-bg">
      <div className="absolute top-0 right-0 w-[70%] sm:w-[50%] h-[50%] bg-accent/5 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] sm:w-[30%] h-[30%] bg-accent-2/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="container-custom relative z-10">
        <Suspense fallback={<PostSkeleton />}>
          <PostContent slug={slug} />
        </Suspense>
      </div>
    </article>
  );
};

export default SinglePost;