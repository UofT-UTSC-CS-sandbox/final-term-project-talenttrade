import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import Post from "./Post";
import { PostType } from "./Post";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import useRequest from "../utils/requestHandler";


const ViewPost: React.FC = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const navigate = useNavigate();
  const apiFetch = useRequest();


  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    const response = await apiFetch("posts/", { method: "GET" });
    setPostList(response);
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

  const navigateEdit = (id: number) => {
    navigate("/CreatePost", {state: {create:false, id: id}});
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
              <button onClick={() => navigateEdit(post.id)}>Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPost;
