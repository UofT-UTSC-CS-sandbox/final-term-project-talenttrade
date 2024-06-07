import axios from "axios"; 
import { useEffect, useState } from "react";
import './ViewPost.css';

function ViewPost() {
    const [postList, setPostList] = useState([]);


    useEffect(() => {
        getPostList();

    }, []); 

    const getPostList = async () => {
        axios.get("http://127.0.0.1:8000/posts/post/")
        .then((res) => setPostList(res.data))
        .catch((error) => alert(error));
    }

    return (
       
        <div class="post">
             <div> Posts: </div>
        {postList.map((post) => (
            <div >
                <div> Looking for: {post.need} </div>
                <div> Can offer: {post.offer}</div>
                <div> description: {post.description}</div>
                <div> date: {new Date(post.published).toLocaleDateString("en-US")}</div>
            </div>

        ))}
    </div>
        
           
    );
}

export default ViewPost;
