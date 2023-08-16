import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

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

    const onSubmit = (e) => {
        e.preventDefault();
        if(email.indexOf("@") === -1) {
            alert("이메일에 @를 포함해주세요!")
            return;
        }
        if(password.length < 7) {
            alert("비밀번호를 8자 이상 입력해주세요!")
            return;
        }

        const fetch = async() => {

            try {
                const data = {
                    email: email,
                    password: password
                }

                const response = await axios.post(URL + '/auth/signup', data)
                console.log(response);
            }
            catch (e)
            {
                console.log(e);
            }
        }
        fetch()
        window.location.replace("/signin")
    };

    const disableButton = () => {
        if(email.indexOf("@")=== -1 || password.length < 7) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    };

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
        disableButton();
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
        disableButton();
    }


    return(
        <div className='signup'>
            <h4>회원가입</h4>
            <hr/>
            <form onSubmit={onSubmit}>
            <input name="email" type="text" className="accountInput" placeholder="이메일" onChange={onEmailHandler} data-testid="email-input" />
            <input name="password" type="password" placeholder="비밀번호" onChange={onPasswordHandler} data-testid="password-input"/>

            <button type="submit" className="signup_btn" data-testid="signup-button" disabled={buttonDisabled}>회원가입</button>
            </form>
            <Link to='/' className="signup">메인으로</Link>
        </div>
    );
}

export default Signup;