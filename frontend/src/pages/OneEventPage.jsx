import { useState, useEffect } from 'react'
import Weekday from '../components/Weekday'
import { useParams, useNavigate } from 'react-router-dom'
import ScheduleCard from '../components/ScheduleCard'

function OneEventPage() {
	const navigate = useNavigate()

	const { id } = useParams() // Получаем ID новости из URL

	const [newsData, setNewsData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Возвращаем прокрутку в верх страницы
		window.scrollTo(0, 0)
		console.log(id) // Проверь, что id приходит корректно

		const fetchNews = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events/${id}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				)
				if (!response.ok) {
					throw new Error('Ошибка')
				}
				const data = await response.json()
				setNewsData(data)
			} catch (error) {
				setError('Ошибка при загрузке')
			}
		}
		fetchNews()
	}, [id])

	const handleBack = () => {
		navigate('/events')
	}

	return (
		<>
			{newsData ? (
				<>
					<img
						src={newsData.image_path}
						alt={newsData.title}
						className='w-full h-75 object-cover rounded-b-3xl'
					/>
					<button onClick={handleBack}>
						<img
							src='/icons/arrow-prev-svgrepo-com.svg'
							alt=''
							className='h-15 w-15 fixed top-5 left-5 bg-[#00000015] p-3 rounded-[20px] shadow-md'
						/>
					</button>
					<div className='overflow-y-auto w-full'>
						<div className='p-4'>
							<p className='text-3xl font-bold mb-5'>{newsData.title}</p>
							<div className='flex flex-col text-2xl font-light mb-3 gap-3'>
								<p>{newsData.description}</p>
							</div>
						</div>
						<button onClick={console.log('кнопка нажата')}>
							<p className='h-15 fixed bottom-0 w-[80%] bg-[#820000] active:bg-[#C10F1A] transition-all p-3 rounded-full text-white text-2xl mb-5 mx-[10%] font-semibold'>
								Участвовать
							</p>
						</button>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	)
}

export default OneEventPage
