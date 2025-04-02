import { useState } from 'react'

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState(1)
	const images = [
		{
			src: 'https://i.pinimg.com/736x/98/cb/8f/98cb8fa81275f968636352824020b90f.jpg',
			caption: 'Новость смешной кот',
		},
		{
			src: 'https://i.pinimg.com/736x/b0/36/bd/b036bdb7fd1ccd463298f02295f8c8f7.jpg',
			caption: 'Новость вайб старой игры',
		},
		{
			src: 'https://i.pinimg.com/736x/78/23/05/7823052aec0858d1c5888850d3fa7354.jpg',
			caption: 'Новость крутая машина',
		},
	]

	const back = () => {
		if (currentIndex > 1) {
			setCurrentIndex(currentIndex - 1)
		}
	}

	const next = () => {
		if (currentIndex < images.length) {
			setCurrentIndex(currentIndex + 1)
		} else {
			setCurrentIndex(1) // Возвращаем к первому слайду
		}
	}

	return (
		<div>
			<article className='relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl rounded-4xl'>
				{images.map((image, index) => (
					<figure
						key={index}
						className='h-60'
						style={{ display: currentIndex === index + 1 ? 'block' : 'none' }}
					>
						<div
							className='absolute inset-0 z-10 h-full w-full '
							style={{
								backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${image.src})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						></div>
						<figcaption className='absolute inset-x-0 bottom-1 z-20 w-96 mx-auto p-4 font-light text-sm text-center tracking-widest leading-snug text-white'>
							{image.caption}
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
				{images.map((_, index) => (
					<div
						key={index}
						className={`h-2 rounded-full cursor-pointer transition-all ${
							currentIndex === index + 1
								? 'bg-[#820000] w-6'
								: 'bg-stone-300 w-2'
						}`}
						onClick={() => setCurrentIndex(index + 1)} // Переключение на слайд по клику на точку
					></div>
				))}
			</div>
		</div>
	)
}

export default Slider
