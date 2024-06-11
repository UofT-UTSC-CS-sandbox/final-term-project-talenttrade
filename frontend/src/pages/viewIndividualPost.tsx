import { PostProps } from "./Post";
import "./viewIndividualPost.css";

const ViewIndividualPost: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <h1 className="title"> {`Need:${post.need} \nOffer:${post.offer}`} </h1>
      <h2 className="author"> {`Posted by ${post.author_name} \nRating: `}</h2>
      <h3 className="descriptionTitle"> Description of Task:</h3>
      <p className="description">{post.description}</p>
      <button className="messageButton">Send Message</button>
    </div>
  );
};

export default ViewIndividualPost;
