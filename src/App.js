import './App.css';
import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import Signin from "./Login/Signin";
import Signup from "./Login/Signup";
import Main from "./Main";
import Todo from "./Todo/Todo";

function App() {
  return (
      // <div>
      //     <Switch>
      //         <Route path="/" exact >
      //             <div className="d-flex">
      //                 <h2>Main</h2>
      //                 <Link to="/signin">로그인</Link>
      //                 ㅤ/ㅤ
      //                 <Link to="/signup">회원가입</Link>
      //             </div>
      //         </Route>
      //
      //         <Route path="/signin" component={Signin}/>
      //         <Route path="/signup" component={Signup}/>
      //     </Switch>
      // </div>

          <Routes>
              <Route path="/" exact element={<Main/>}></Route>
              <Route path="/signin" element={< Signin/>}></Route>
              <Route path="/signup" element={< Signup/>}></Route>
              <Route path="/todo" element={<Todo />}></Route>
          </Routes>
  );
}

export default App;
