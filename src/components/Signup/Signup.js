import React, { useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {SignupUser} from '../../actions/UserAction'
import { Link } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import Footer from '../footer/Footer';
import Header1 from '../header/Header';
import { Col, Row } from 'antd';

function Login(props) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => {
        if(password === confirmPassword) {
            dispatch(SignupUser(data))            
        } else{
            alert("wrong repeat password")
        }
    }
  
    return (
      <>
        <Header1/>
      <Row>
        <Col lg={10} md={24}>
        <div className="signup-page">
        <h2>ĐĂNG KÍ</h2>
        <form onSubmit={handleSubmit(onSubmit)} classname="form-signup">
          <input {...register("name")} placeholder="Name" required></input>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            required
          ></input>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <input
            {...register("repeat password")}
            placeholder=" Repeat password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>

          <input type="submit" value="Đăng Kí"></input>
        </form>
        <div>        
          <Link to="/login" style={{padding: '5px'}}>Đăng nhập ngay</Link>
          <Link to="/" style={{padding: '5px'}}>Quay về trang chủ</Link>
        </div>
      </div>

        </Col>
      <Col lg={14} md={0} xs={0}>
      <img src='https://res.cloudinary.com/dgxtwb88k/image/upload/v1673277903/z4026424815833_d712df79b04ff516583b90de8c3e6773_eb7osh.jpg' className='img-lr'></img>

      </Col>
      </Row>
      <Footer/>
      </>
    );
}

export default Login;