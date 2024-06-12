import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import Post from "./Post";
import { PostType } from "./Post";
import "./Post.css";

const ViewPost: React.FC = () => {
  const [postList, setPostList] = useState<PostType[]>([]);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    axios
      .get(`${host}/posts/`)
      .then((res) => setPostList(res.data))
      .catch((error) => alert(error));
  };

  const deleteButton = async (id: number) => {
    axios
      .delete(`${host}/posts/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("the Post was deleted successfully");
          setPostList(postList.filter((post) => post.id !== id));
        } else alert("Error deleting the post.");
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <h1> Your Posts: </h1>
      <div className="post-container ">
        {postList.length === 0 ? (
          <h2> No Posts Available</h2>
        ) : (
          postList.map((post) => (
            <div key={post.id}>
              <Post post={post} />
              <button onClick={() => deleteButton(post.id)}>Delete</button>
              <button> Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPost;
