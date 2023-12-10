import { useState, useEffect } from "react";
import { api } from "../services/Api";
import { v4 as uuidv4 } from "uuid";
import "../assets/style.css";

const Post = ({}) => {
  const [post, setPost] = useState([]);

  //Get API
  useEffect(() => {
    api.get("http://localhost:3333/posts").then((response) => {
      setPost(response.data);
    });
  }, []);

  //Post API
  const addNewPost = async () => {
    const newPost = {
      id: uuidv4(),
      title: "New Post",
      author: "MARIA",
      date: "New Date",
      body: "New Body",
    };

    await api.post("http://localhost:3333/posts", newPost).then((response) => {
      setPost([...post, response.data]);
    });
  };
  //Delete API
  const deletePost = async (id: any) => {
    await api.delete(`http://localhost:3333/posts/${id}`).then((response) => {
      setPost(post.filter((post) => post.id !== id));
    });
  };

  //update API
  const updatePost = async (id: any) => {
    const updatedPost = {
      author: "mateus batisti filho doido",
      date: "12/12/12",
      body: "New Body",
    };

    await api
      .put(`http://localhost:3333/posts/${id}`, updatedPost)
      .then((response) => {
        setPost((prevPosts: any) =>
          prevPosts.map((post: any) =>
            post.id === id ? { ...post, ...response.data } : post
          )
        );
      });
  };

  return (
    <div>
      {post.map(({ id, title, author, date, body }) => (
        <div key={id} className="container">
          <p>
            {author} - {title} - {date} - {body}
          </p>
          <button onClick={() => deletePost(id)}>Delete</button>
          <button onClick={() => updatePost(id)}>Update</button>
        </div>
      ))}
      <div className="addNewUserContainer">
        <button onClick={addNewPost}>Add new User</button>
      </div>
    </div>
  );
};

export default Post;
