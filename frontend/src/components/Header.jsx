import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header({ username }) {
	const navigate = useNavigate()

	const HandleSchedule = () => {
		navigate('/profile')
	}

	return (
		<header className='w-full h-25 bg-[#820000] flex justify-between items-center px-5'>
			<div className='flex flex-col'>
				<p className='font-semibold text-xl text-white'>
					Привет, {username} 👋
				</p>
				<p className='font-thin text-sm text-white'>Студент</p>
			</div>
			<button onClick={HandleSchedule}>
				<img
					src='icons/user.svg'
					alt=''
					className='h-15 rounded-3xl invert-100 p-3'
				/>
			</button>
		</header>
	)
}

export default Header
