import React from "react";
import {Link, Route} from "react-router-dom";
import signin from "./Login/Signin";
import signup from "./Login/Signup";

function Main() {
    return(
        <div>
             <h2>메인 화면</h2>
            ㅤ<Link to="signin">로그인</Link>
            ㅤ/ㅤ
            <Link to="signup">회원가입</Link>
        </div>
    )
}

export default Main;