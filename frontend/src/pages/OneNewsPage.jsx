import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function OneNewsPage() {
	const { id } = useParams() // Получаем ID новости из URL
	const navigate = useNavigate()

	const [newsData, setNewsData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Возвращаем прокрутку в верх страницы
		window.scrollTo(0, 0)

		const fetchNews = async () => {
			try {
				const response = await fetch(`http://192.168.167.48:8000/news/${id}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				if (!response.ok) {
					throw new Error('Ошибка')
				}
				const data = await response.json()
				setNewsData(data)
			} catch (error) {
				setError('Ошибка при загрузке новости')
			}
		}
		fetchNews()
	}, [id])

	const handleBack = () => {
		navigate('/news')
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
								<div
									dangerouslySetInnerHTML={{ __html: newsData.description }}
								/>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	)
}

export default OneNewsPage
