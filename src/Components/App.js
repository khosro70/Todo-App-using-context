import React, { useReducer } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// css
import "bootstrap/dist/css/bootstrap.css";

// Components
import Header from "./Layouts/Header";

// Contexts
import TodosContext from "./../Context/todos";
import AuthContext from "./../Context/auth";

// import Reducers
import AppReducer from "./../Reducers/appReducer";

// lodable component for Routes
import loadable from "@loadable/component";
const Home = loadable(() => import("../Routes/Home"));
const About = loadable(() => import("../Routes/About"));
const Contact = loadable(() => import("../Routes/Contact"));
const Todo = loadable(() => import("../Routes/Todo"));
const NotFound = loadable(() => import("../Routes/NotFound"));

function App() {
  const [state, dispatch] = useReducer(AppReducer, {
    todos: [],
    authenticated: false,
  });

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          authenticated: state.authenticated,
          dispatch,
        }}
      >
        <TodosContext.Provider
          value={{
            todos: state.todos,
            dispatch,
          }}
        >
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/todos/:todo" element={<Todo />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </TodosContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
