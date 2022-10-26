import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
		<Link to='signup'>SignUp</Link>
		<Link to='login'>Login</Link>
		</>
	)
}