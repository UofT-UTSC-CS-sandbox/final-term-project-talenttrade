import { useEffect, useState } from "react";
import Post from "./Post";
import { PostType } from "./Post";
import useRequest from "../utils/requestHandler";
import withProfileCheck from "../hoc/withProfileCheck";

const ViewSavedPosts: React.FC = () => {
    const [savedPostList, setSavedPostList] = useState<PostType[]>([]);
    const apiFetch = useRequest();

    useEffect(() => {
        getSavedPostList();
    }, []);

    const getSavedPostList = async () => {
        const response = await apiFetch("posts/save-post/", { method: "GET" });
        setSavedPostList(response);
    };

    return (
        <div>
            <h1>Your Saved Posts:</h1>
            <div className="post-container">
                {savedPostList.length === 0 ? (
                    <h2>No Saved Posts Available</h2>
                ) : (
                    savedPostList.map((post) => (
                        <div key={post.id}>
                            <Post post={post} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default withProfileCheck(ViewSavedPosts);
