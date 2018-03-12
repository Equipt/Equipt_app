import React from 'react';
import logo from 'assets/images/logo.png';

import { Link } from 'react-router-dom';

const Home = ({ content = {} }) => {

	return (
		<section className="container full-width">
		<div className="logo-wrapper">
			<h1>
				<img src={ logo } width="100px"/>
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
				transform: translateY(40%);
			}
			h1 {
				font-size: 80px;
				margin-top: 50px;
			}
			h1:before {
				content: '';
				display: inline-block;
				vertical-align: top;
				background: url('https://s3-us-west-2.amazonaws.com/equipt-assets/logo.png') no-repeat;
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
