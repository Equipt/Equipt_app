import React from 'react';
import logo from 'assets/images/logo.png';

import { Link } from 'react-router-dom';

const Home = () => {

	return (
		<section className="container full-width">
		<div className="logo-wrapper">
			<h1>
				<img src={ 'https://s3-us-west-2.amazonaws.com/equipt-assets/logo.png' } width="100px"/>
				Equipt
			</h1>
			<p>Outdoor Sporting Equiptment Rentals</p>
			<div className="session-container">
				<Link className="login cta large" to="/login">Login</Link>
				<Link className="signup cta large" to="/signup">Signup</Link>
			</div>
		</div>
		<style jsx>{`
			.logo-wrapper {
				transform: translateY(30%);
			}
			h1 {
				font-size: 80px;
				margin-top: 50px;
			}
			img {
				vertical-align: bottom;
				width: 100px;
				height: auto;
			}
			h1, p {
				color: #499252;
				font-family: 'Graduate', cursive;
				text-align: center;
			}
			p {
				margin-top: 35px;
				font-size: 30px;
			}
			.session-container {
				width: 320px;
				margin: 50px auto;
			}
		`}</style>
		</section>
	)

}

export default Home;
