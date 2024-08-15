import { useEffect, useState } from "react";
import Post from "./Post";
import { PostType } from "./Post";
import useRequest from "../utils/requestHandler";

const ViewPost: React.FC = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const apiFetch = useRequest();

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    const response = await apiFetch("posts/", { method: "GET" });
    setPostList(response);
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
              <Post
                post={post}
                myPost={true}
                postList={postList}
                setPostList={setPostList}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPost;
