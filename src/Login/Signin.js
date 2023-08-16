import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import async from "async";

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const URL = 'https://www.pre-onboarding-selection-task.shop';

    const [redirectTodo, setRedirectTodo] = useState(false);

    useEffect(()=> {
        const token = localStorage.getItem("access_token");

        if(token) {
            setRedirectTodo(true);
        }
    },[]);

    if(redirectTodo) {
        return <Navigate to="/todo"/>;
    }

    // 1
    // const [info,setInfo] = useState('');
    //
    //
    // const data = {
    //     email: email,
    //     password: password
    // }
    //
    // axios.post(URL, data)
    //     .then((res) => {
    //         console.log(res.data);
    //         if(res.data.code === 200) {
    //             console.log("로그인 성공");
    //         }
    //     });


    // 2
    // const fetch = async() => {
    //
    //     try {
    //         const data = {
    //             email: email,
    //             password: password
    //         }
    //
    //         await axios.post(URL, data)
    //             .then(function (res) {
    //                 console.log(res.data);
    //                 // setInfo(res.data);
    //             })
    //     }
    //     catch (e)
    //     {}
    // }
    // fetch()
    // window.location.replace("/signin")


    // 3
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email.indexOf("@") === -1 ) {
            setError("이메일에 @를 포함해주세요")
            return;
        }
        if (password.length < 8) {
            setError("비밀번호를 8자 이상 입력해주세요");
            return;
        }

        try {
            const data = {
                email:email,
                password:password,
            };

            const response = await axios.post(URL + '/auth/signin', data);
            const access_token = response.data.access_token;
            localStorage.setItem("access_token", access_token);
            window.location.replace("/todo");

        } catch (error) {
            let message = "로그인 실패! 이메일과 비밀번호를 다시 확인해주세요."
            setError(error?.response?.data?.message || message);
        }

    };

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
        setError(null);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
        setError(null);
    }

    return(
        <div className='login'>
            <h4>회원 로그인</h4>
            <hr/>
            {error && <p className="error-message">{error}</p> }
            <form onSubmit={onSubmit}>
                <input name="email" type="text" className="accountInput" onChange={onEmailHandler} placeholder="이메일" data-testid="email-input"/>
                <input name="password" type="password" onChange={onPasswordHandler} placeholder="비밀번호" data-testid="password-input"/>

                <button type="submit" className="login_btn" data-testid="signin-button">로그인</button>
            </form>

            <Link to='/signup' className="signup">회원가입</Link>

        </div>
    );
}

export default Signin;