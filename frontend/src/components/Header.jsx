import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
	const navigate = useNavigate()
	const [userName, setUserName] = useState('')

	useEffect(() => {
		const storedName = localStorage.getItem('userFullName')
		if (storedName) {
			setUserName(storedName.split(' ')[1] || storedName) // Берем имя или fallback
		}
	}, [])

	const HandleSchedule = () => {
		navigate('/schedule')
	}

	return (
		<header className='w-full h-35 rounded-b-4xl bg-white flex justify-between items-center px-5'>
			<div className='flex flex-col'>
				<p className='font-semibold text-xl'>Привет, {userName} 👋</p>
				<p className='font-thin text-sm'>Студент</p>
			</div>
			<button onClick={HandleSchedule}>
				<img
					src='icons/calendar-alt-svgrepo-com.svg'
					alt=''
					className='h-17 border-2 border-solid rounded-3xl p-4 mr-2'
				/>
			</button>
		</header>
	)
}

export default Header
