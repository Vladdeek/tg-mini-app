import { useState, useEffect } from 'react'

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState(1)
	const [newsData, setNewsData] = useState([])
	const [error, setError] = useState(null)

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
				setNewsData(data.slice(0, 5)) // Берём первые 5 новостей
			} catch (error) {
				setError('Ошибка при загрузке новостей')
			}
		}
		fetchNews()
	}, [])

	const back = () => {
		setCurrentIndex(prev => (prev > 1 ? prev - 1 : newsData.length))
	}

	const next = () => {
		setCurrentIndex(prev => (prev < newsData.length ? prev + 1 : 1))
	}

	return (
		<div>
			<article className='relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl rounded-4xl'>
				{newsData.map((news, index) => (
					<figure
						key={index}
						className='h-60'
						style={{ display: currentIndex === index + 1 ? 'block' : 'none' }}
					>
						<div
							className='absolute inset-0 z-10 h-full w-full '
							style={{
								backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${news.image_path})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						></div>
						<figcaption className='absolute inset-x-0 bottom-1 z-20 w-96 mx-auto p-4 font-light text-sm text-center tracking-widest leading-snug text-white'>
							{news.title}
						</figcaption>
					</figure>
				))}

				<div className='flex justify-between items-center w-full p-5'>
					<button
						onClick={back}
						className='w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-[#ffffff25] p-2'
					>
						<img src='icons/arrow-prev-svgrepo-com.svg' alt='' />
					</button>

					<button
						onClick={next}
						className='w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-[#ffffff25] p-2'
					>
						<img
							src='icons/arrow-prev-svgrepo-com.svg'
							alt=''
							className='rotate-180'
						/>
					</button>
				</div>
			</article>
			<div className='flex justify-center gap-1 mt-2'>
				{newsData.map((_, index) => (
					<div
						key={index}
						className={`h-2 rounded-full cursor-pointer transition-all ${
							currentIndex === index + 1
								? 'bg-[#820000] w-6'
								: 'bg-[#00000025] w-2'
						}`}
						onClick={() => setCurrentIndex(index + 1)}
					></div>
				))}
			</div>
		</div>
	)
}

export default Slider
