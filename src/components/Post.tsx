import { useState, useEffect, useRef } from "react";
import { api } from "../services/Api";
import { v4 as uuidv4 } from "uuid";

const Post = ({}) => {
  const [post, setPost] = useState([]);
  const newPostRef = useRef();

  useEffect(() => {
    api.get("http://localhost:3333/posts").then((response) => {
      setPost(response.data);
    });
  }, []);

  const addNewPost = async () => {
    const newPost = {
      id: uuidv4(),
      title: "New Post",
      author: "New Author",
      date: "New Date",
      body: "New Body",
    };

    await api.post("http://localhost:3333/posts", newPost).then((response) => {
      setPost([...post, response.data]);
      newPostRef.current.textContent = "New Post Added";
    });
  };

  return (
    <div>
      {post.map(({ id, title, author, date, body }) => (
        <div key={id}>
          <p>
            {id} -{author} - {title} - {date} - {body}
          </p>
        </div>
      ))}
      <button onClick={addNewPost}>Add new User</button>
    </div>
  );
};

export default Post;
