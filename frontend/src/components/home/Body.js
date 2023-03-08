import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import * as PostsApi from "../../network/post_api";

const Body = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      const posts = await PostsApi.fetchPost();
      setPosts(posts);
    }
    fetchPost();
  }, []);

  return (
    <div>
      <p>HomeBody</p>
      <ul>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Body;
