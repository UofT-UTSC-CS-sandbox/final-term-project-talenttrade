import React from "react";
import { useState } from "react";
export interface PostType {
  id: number;
  author_name: string;
  need: string;
  offer: string;
  description: string;
  published: Date;
  active: boolean;
}

export interface PostProps {
  post: PostType;
}

const descriptionLmt = 250;

const Post: React.FC<PostProps> = ({ post }) => {
  const [expand, SetExpand] = useState(false);

  return (
    <a
      href="#"
      className={`post ${expand ? "expand" : ""}`}
      onClick={() =>
        post.description.length > descriptionLmt && SetExpand(!expand)
      }
    >
      <div className="text">
        <span>Looking for: </span>
        {post.need}
      </div>
      <div className="text">
        <span>Can offer: </span>
        {post.offer}
      </div>
      <div className="text">
        <span>Description: </span>
        {expand
          ? post.description
          : post.description.length > descriptionLmt
          ? `${post.description.substring(0, descriptionLmt)}...`
          : post.description}
      </div>
      <div className="text">
        Date: {new Date(post.published).toLocaleDateString("en-US")}
      </div>
      {post.active ? (
        <div style={{ color: "green" }}>Active</div>
      ) : (
        <div style={{ color: "#aa0000" }}>Inactive</div>
      )}
    </a>
  );
};

export default Post;
