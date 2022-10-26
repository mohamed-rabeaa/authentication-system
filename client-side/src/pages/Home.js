import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
			<div className='w-full min-h-screen flex items-center justify-center'>
				<div className='bg-transparent border-2 border-violet-800 rounded-md p-16'>
					<div>
						<h1 className='text-4xl font-bold text-center'>Hi mohamed</h1>
						<p className='text-slate-700 mt-4 text-center text-lg'>login is success</p>
					</div>
					<div className='mt-14'>
						<Link to='signup' className='bg-blue-900 rounded-md px-12 py-4 mx-4 text-slate-300'>SignUp</Link>
						<Link to='login' className='bg-blue-900 rounded-md px-12 py-4 mx-4 text-slate-300'>Login</Link>
					</div>
				</div>

			</div>
		</>
	)
}