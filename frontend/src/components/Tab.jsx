import { useState } from 'react'

function Tabs() {
	return (
		<div className='relative h-screen'>
			<div className='fixed flex justify-between px-20 bottom-0 left-0 w-full bg-white text-white py-3 text-center'>
				<button className='h-15 w-15'>
					<img src='icons/news-svgrepo-com.svg' alt='' />
				</button>
				<button className='h-15 w-15'>
					<img src='icons/news-svgrepo-com.svg' alt='' />
				</button>
				<button className='h-15 w-15'>
					<img src='icons/news-svgrepo-com.svg' alt='' />
				</button>
			</div>
		</div>
	)
}

export default Tabs
