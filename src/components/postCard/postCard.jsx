import Image from "next/image";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <article className="card group cursor-pointer overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        {post.img ? (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="relative aspect-video bg-bgSoft flex items-center justify-center">
            <svg className="w-16 h-16 text-textSoft/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Content */}
        <div className="p-5">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-textSoft mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-textSoft text-sm line-clamp-3 mb-4">
            {post.desc}
          </p>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-primary font-medium text-sm group/link">
            <span>Read More</span>
            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
