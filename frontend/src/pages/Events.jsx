import { useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'

function Events({}) {
	const navigate = useNavigate()
	return (
		<div className='p-5'>
			<div className='flex flex-col'>
				<button
					className='flex items-center mb-7'
					onClick={() => {
						navigate('/main')
					}}
				>
					<img
						src='icons/arrow-prev-svgrepo-com.svg'
						alt=''
						className='h-15 p-3 rounded-[12px] shadow-md bg-[#00000025]'
					/>
				</button>
				<p className='font-bold text-4xl opacity-75 mb-5'>Мероприятия</p>
				<EventCard
					ImagePath={'https://placehold.co/600x400'}
					title={'КликФест – техно-ивент про IT, стартапы и разработки.'}
					date={'Апрель 5, 2025'}
					time={'14:00'}
					HandleNews={() => {
						navigate('/event')
					}}
				/>
				<EventCard
					ImagePath={'https://placehold.co/600x400'}
					title={
						'ИдеяНаМаксималках – хакатон или брейншторм-сессия для генерации идей.'
					}
					date={'Апрель 5, 2025'}
					time={'14:00'}
					HandleNews={() => {
						navigate('/event')
					}}
				/>
			</div>
		</div>
	)
}

export default Events
