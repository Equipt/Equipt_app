import React from 'react';

const Home = ({ content = {} }) => {

	return (
		<section className="container">
		<div className="logo-wrapper">
			<h1>Equipt</h1>
			<p>Peer to Peer Outdoor Sporting Equiptment Rentals</p>
		</div>
		<style jsx>{`
			.logo-wrapper {
				transform: translateY(50%);
			}
			h1 {
				font-size: 80px;
				margin-top: 50px;
			}
			h1:before {
				content: '';
				display: inline-block;
				vertical-align: top;
				background: url(${ content.logo }) no-repeat;
				width: 100px;
				height: auto;
			}
			h1, p {
				color: #499252;
				font-family: 'Graduate', cursive;
				text-align: center;
			}
			p {
				margin-top: 25px;
				font-size: 30px;
			}
		`}</style>
		</section>
	)

}

export default Home;
