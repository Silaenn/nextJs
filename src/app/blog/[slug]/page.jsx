import React, { Suspense } from "react";
import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const posts = await getPost(slug);

  return {
    title: posts.title,
    description: posts.desc,
  };
};

const SinglePost = async ({ params }) => {
  const { slug } = params;

  const posts = await getData(slug);
  // const posts = await getPost(slug);
  console.log(posts);

  return (
    <div className={styles.container}>
      {posts.img && (
        <div className={styles.imgContainer}>
          <Image src={posts.img} height={300} alt="" fill />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{posts.title}</h1>

        <div className={styles.detail}>
          {posts && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={posts.userId} />
            </Suspense>
          )}

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {posts.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>

        <div className={styles.content}>{posts.desc}</div>
      </div>
    </div>
  );
};

export default SinglePost;
