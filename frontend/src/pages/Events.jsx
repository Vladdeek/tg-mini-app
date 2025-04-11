import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'

function Events({}) {
	const navigate = useNavigate()
	const [newsData, setNewsData] = useState([])
	const [error, setError] = useState(null)

	// Функция для преобразования даты в нужный формат
	const formatDate = dateString => {
		const months = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		]
		// Парсим строку даты в объект Date
		const date = new Date(dateString)

		// Получаем компоненты даты
		const year = date.getFullYear()
		const month = months[date.getMonth()]
		const day = date.getDate()

		// Форматируем время
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')

		// Возвращаем дату в нужном формате
		return `${month} ${day}, ${year} - ${hours}:${minutes}`
	}

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch('http://192.168.167.48:8000/events/', {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				if (!response.ok) {
					throw new Error('Ошибка')
				}
				const data = await response.json()
				setNewsData(data)
			} catch (error) {
				setError('Ошибка при загрузке новостей')
			}
		}
		fetchNews()
	}, [])

	const handleEvent = id => {
		navigate(`/events/${id}`)
	}
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
						className='h-15 bg-[#00000015] p-3 rounded-[20px] shadow-md'
					/>
				</button>
				<p className='font-bold text-4xl opacity-75 mb-5'>Мероприятия</p>
				{newsData.length > 0 ? (
					newsData.map(newsItem => (
						<EventCard
							key={newsItem.id}
							id={newsItem.id}
							title={newsItem.title}
							ImagePath={newsItem.image_path} // Здесь предполагаем, что есть URL изображения
							date={formatDate(newsItem.date)} // Применяем функцию для форматирования даты
							handleEvent={handleEvent}
						/>
					))
				) : (
					<p className='text-center text-gray-500'>Мероприятий нет</p>
				)}
			</div>
		</div>
	)
}

export default Events
