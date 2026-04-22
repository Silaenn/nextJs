import { getPost, getUser } from "@/lib/data";
import Image from "next/image";
import { PostSkeleton } from "@/components/skeletons/skeletons";
import { Suspense } from "react";
import Link from "next/link";

export const revalidate = 3600; // Cache for 1 hour

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
      <div className="flex items-center gap-4 p-2 pr-6 glass rounded-full border-white/5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20 shadow-xl">
          <Image
            src={user?.img || "/noavatar.png"}
            alt={user?.username || "Author"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-0.5">Lead Architect</p>
          <p className="text-sm font-bold text-white tracking-tight">{user?.username || "Anonymous"}</p>
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
      <div className="container-custom py-32">
        <div className="text-center py-20 glass rounded-[3rem] border-white/5">
          <h1 className="text-3xl font-black italic tracking-tighter mb-4">ARTIFACT NOT FOUND.</h1>
          <p className="text-textSoft mb-10 font-medium">The data has been purged or moved from this sector.</p>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto reveal-up">
      {/* Featured Image - Display Case Style */}
      {post.img && (
        <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-20 glass border-white/5 shadow-2xl group bg-[#080808]">
          <div className="relative w-full h-full p-8 md:p-16">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
              priority
            />
            {/* Ambient Inner Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.03)_0%,transparent_70%)] pointer-events-none" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
        </div>
      )}

      {/* Content Layout */}
      <div className="max-w-4xl mx-auto">
          {/* Header Metadata */}
          <header className="mb-20">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] w-12 bg-accent" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">Artifact Journal</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter text-white mb-16 italic uppercase">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8">
              <PostAuthor userId={post.userId} />

              <div className="flex items-center gap-4 glass px-6 py-4 rounded-full border-white/10">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-textSoft">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="relative pl-8 md:pl-16">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-accent/50 via-accent/10 to-transparent" />
            
            <p className="text-2xl md:text-3xl text-white font-medium leading-[1.4] mb-16 italic opacity-95 tracking-tight">
                {post.desc}
            </p>
            
            <div className="prose prose-invert prose-lg max-w-none text-textSoft/80 text-xl leading-relaxed space-y-10 font-medium">
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
          <div className="mt-40 pt-16 border-t border-white/5 flex justify-between items-center">
            <Link href="/blog" className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full glass border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-500">
                <svg className="w-5 h-5 text-white group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-1">Navigation</span>
                <span className="text-sm font-bold text-white group-hover:text-accent transition-colors tracking-tight">Return to Library</span>
              </div>
            </Link>
            
            <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-muted">SECURED ARCHIVE SECTOR 01</div>
          </div>
      </div>
    </div>
  );
};

const SinglePost = ({ params }) => {
  const { slug } = params;

  return (
    <article className="relative min-h-screen py-32 overflow-hidden bg-bg">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-accent-2/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <Suspense fallback={<PostSkeleton />}>
          <PostContent slug={slug} />
        </Suspense>
      </div>
    </article>
  );
};

export default SinglePost;
