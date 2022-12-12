import React, { useState, useContext, useReducer } from "react";
import { Link } from "react-router-dom";

// component
import EditTodo from "./EditTodo";

// context
import TodosContext from "../../Context/todos";

// Api
import todosApi from "./../../Api/todos";

function Todo(props) {
  const { item } = props;
  const [edit, setEdit] = useState(false);
  const todosContext = useContext(TodosContext);
  const [loading, setLoading] = useState();

  let editHandler = (text) => {
    setLoading(true);
    todosApi
      .put(`/todos/${item.key}.json`, { done: item.done, text })
      .then((response) => {
        todosContext.dispatch({
          type: "edit_todo",
          payload: { key: item.key, text },
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));

    setEdit(false);
  };

  let doneHandler = () => {
    setLoading(true);
    todosApi
      .put(`/todos/${item.key}.json`, { done: !item.done, text: item.text })
      .then((response) => {
        todosContext.dispatch({
          type: "toggle_todo",
          payload: { key: item.key },
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  let deleteHandler = (e) => {
    setLoading(true);
    todosApi
      .delete(`/todos/${item.key}.json`)
      .then((response) => {
        console.log(response.data);
        todosContext.dispatch({
          type: "delete_todo",
          payload: { key: item.key },
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!edit ? (
        <>
          {loading ? (
            <h2>loading ...</h2>
          ) : (
            <div className="col-10 col-md-6 mb-2">
              <div className="d-flex justify-content-between align-items-center border rounded p-3">
                <div>
                  <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={`/todos/${item.key}`}
                  >
                    {item.text}
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    className={`btn btn-sm mr-1 ${
                      !item.done ? "btn-success" : "btn-warning"
                    }`}
                    onClick={doneHandler}
                  >
                    {item.done ? "undone" : "done"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-sm mr-1"
                    onClick={() => setEdit(true)}
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={deleteHandler}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <EditTodo text={item.text} edit={editHandler} />
      )}
    </>
  );
}

export default Todo;
