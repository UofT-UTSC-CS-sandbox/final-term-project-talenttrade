import React from 'react';

export interface PostType {
    id: number;
    need: string;
    offer: string;
    description: string;
    published: Date;
    active: boolean;
}

export interface PostProps {
    post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="post">
            <div>
                <div>Looking for: {post.need}</div>
                <div>Can offer: {post.offer}</div>
                <div>Description: {post.description}</div>
                <div>Date: {new Date(post.published).toLocaleDateString("en-US")}</div>
                {post.active ? <div>Active Post</div> : <div>Inactive Post</div>}
            </div>
        </div>
    );
};

export default Post;
