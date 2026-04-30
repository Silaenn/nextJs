import React from "react";
import { getUser } from "@/lib/data";
import Image from "next/image";

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  return (
    <div className="flex items-center gap-5">
      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 glass">
        <Image
          src={user.img ? user.img : "/noavatar.png"}
          className="object-cover"
          alt={user.username}
          fill
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Author</span>
        <span className="text-sm font-bold text-white uppercase tracking-widest">{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
