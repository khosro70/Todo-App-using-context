import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import todoApi from "./../Api/todos";

function Todo(props) {
  const params = useParams();
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState();
  const history = useNavigate();
  console.log(history);
  useEffect(() => {
    setLoading(true);
    todoApi
      .get(`/todos/${params.todo}.json`)
      .then((response) => {
        if (response.data) {
          setTodo({ ...response.data, key: params.todo });
        } else {
          history("/404");
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h2>loading ...</h2>
        ) : (
          <div className="col-12">
            <h2>Todo Details</h2>
            <p>{todo.text}</p>
            <span
              className={`badge ${todo.done ? "bg-success" : "bg-warning"}`}
            >
              {todo.done ? "done" : "undone"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
