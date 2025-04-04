import { useEffect, useState } from 'react'

function EventCard({ ImagePath, title, date, handleEvent, id }) {
	return (
		<>
			<div className='flex gap-3 mb-5' onClick={() => handleEvent(id)}>
				<img
					src={ImagePath}
					alt=''
					className='rounded-2xl h-25 w-2/6 object-cover'
				/>
				<div className='flex flex-col w-4/6'>
					<p className='h-18 font-semibold'>{title}</p>
					<div className='flex gap-2 opacity-50 items-center'>
						<img src='icons/calendar-clock.svg' alt='' className='h-5' />
						<p>{date}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default EventCard
