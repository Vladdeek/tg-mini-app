import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Slider from '../components/Carousel'
import NewsCard from '../components/NewsCard'

function News() {
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
		const [year, month, day] = dateString.split('-')

		// Убираем ведущие нули, если они есть, кроме тех случаев, когда число 10, 20, 30
		const formattedDay = day.startsWith('0') ? day[1] : day
		const formattedMonth = months[parseInt(month) - 1]

		return `${formattedMonth} ${formattedDay}, ${year}`
	}

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch('http://192.168.167.48:8000/news/', {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				if (!response.ok) {
					throw new Error('Ошибка')
				}
				const data = await response.json()
				setNewsData(data.slice(0, 10))
			} catch (error) {
				setError('Ошибка при загрузке новостей')
			}
		}
		fetchNews()
	}, [])

	const handleNews = id => {
		navigate(`/news/${id}`)
	}

	return (
		<div className='p-5'>
			<div className='flex flex-col'>
				<button
					className='flex items-center mb-7'
					onClick={() => navigate('/main')}
				>
					<img
						src='icons/arrow-prev-svgrepo-com.svg'
						alt='Назад'
						className='h-15 bg-[#00000015] p-3 rounded-[20px] shadow-md'
					/>
				</button>
				<p className='font-bold text-4xl opacity-75 mb-13'>Срочные новости</p>
				<Slider />
				<div className='flex justify-between'>
					<p className='font-semibold text-xl opacity-75 mt-5 mb-5'>
						Последние новости
					</p>
					<p
						className='text-blue-700 font-semibold text-lg opacity-75 mt-5 mb-5'
						onClick={() => navigate('/allnews')}
					>
						Все новости
					</p>
				</div>

				{newsData.length > 0 ? (
					newsData.map(newsItem => (
						<NewsCard
							key={newsItem.id}
							id={newsItem.id}
							title={newsItem.title}
							ImagePath={newsItem.image_path} // Здесь предполагаем, что есть URL изображения
							date={formatDate(newsItem.date)} // Применяем функцию для форматирования даты
							handleNews={handleNews}
						/>
					))
				) : (
					<p className='text-center text-gray-500'>Новостей нет</p>
				)}
			</div>
		</div>
	)
}

export default News
