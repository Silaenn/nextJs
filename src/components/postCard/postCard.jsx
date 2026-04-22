import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <article className="group relative glass rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-accent/5 hover:shadow-2xl border-white/5 hover:border-white/20">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Date Badge - Floating */}
        <div className="absolute top-6 right-6 z-20 glass px-4 py-2 rounded-full border-white/20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {post.img ? (
            <Image
              src={post.img}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
          ) : (
            <div className="w-full h-full bg-surface-2 flex items-center justify-center">
               <span className="text-4xl font-black italic text-white/5 tracking-tighter uppercase">NO.IMAGE</span>
            </div>
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80" />
          
          {/* Bottom Content (Overlapping) */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pt-20">
            <h2 className="text-2xl font-black leading-tight mb-4 tracking-tighter text-white group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            
            <p className="text-textSoft text-sm line-clamp-2 mb-6 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              {post.desc}
            </p>

            <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-accent transition-all duration-500 group-hover:w-16" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Discover More</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
