import { getPosts } from "@/lib/data";
import Image from "next/image";
import { deletePost } from "@/lib/action";

const AdminPosts = async () => {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Posts</h2>
        <span className="text-sm text-textSoft bg-bg px-3 py-1 rounded-full">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-textSoft">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p>No posts yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div 
              key={post._id.toString()}
              className="flex items-center justify-between p-4 bg-bg/50 rounded-lg hover:bg-bg/70 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-bgSoft">
                  <Image
                    src={post.img || "/noavatar.png"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-textSoft">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <form action={deletePost}>
                <input type="hidden" name="id" value={post._id.toString()} />
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
