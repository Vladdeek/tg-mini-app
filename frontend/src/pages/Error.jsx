import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Error() {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate('/main')
	}

	return (
		<>
			<button onClick={handleBack}>
				<img
					src='/icons/arrow-prev-svgrepo-com.svg'
					alt=''
					className='h-15 w-15 fixed top-5 left-5 bg-[#00000015] p-3 rounded-[20px] shadow-md'
				/>
			</button>
			<div className='h-screen w-screen flex align-items justify-center'>
				<p className='self-center text-2xl mb-20'>В разработке</p>
			</div>
		</>
	)
}

export default Error
