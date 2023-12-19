import React, { useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/UserAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { Col, Row } from 'antd';

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  });

  return (
    <>
        <Header/>
      <Row>
        <Col lg={10} md={24}>
        <div class="login-page">
      <h2> ĐĂNG NHẬP </h2>
      <form onSubmit={handleSubmit(onSubmit)} class="form-login">
        <input {...register("email")} placeholder="Email" required></input>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        ></input>

        <input type="submit" value="Đăng Nhập"></input>
        {error ? <h2>{error}</h2> : <></>}
        <div>        
          <Link to="/register" style={{padding: '5px'}}>Tạo tài khoản?</Link>
          <Link to="/" style={{padding: '5px'}}>Quay về trang chủ</Link>
        </div>
      </form>
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