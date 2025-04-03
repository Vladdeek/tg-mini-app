import { useState, useEffect } from 'react'
import Weekday from '../components/Weekday'
import { useNavigate } from 'react-router-dom'
import ScheduleCard from '../components/ScheduleCard'

function OneEventPage() {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate('/events')
	}

	return (
		<>
			<img
				src='https://placehold.co/400x300'
				alt=''
				className='w-full h-75 object-cover rounded-b-3xl'
			/>
			<button onClick={handleBack}>
				<img
					src='icons/arrow-prev-svgrepo-com.svg'
					alt=''
					className='h-15 fixed top-5 left-5 bg-[#ffffff25] p-3 rounded-[20px]'
				/>
			</button>
			<div className='overflow-y-auto w-full'>
				<div className='p-4'>
					<p className='text-3xl font-bold mb-5'>
						"Тестовое Мероприятие 2025" 🧪🎉
					</p>
					<p className='text-xl font-semibold mx-3 mb-3'>О мероприятии</p>
					<div className='flex flex-col text-2xl font-light mx-3 mb-30 gap-3'>
						<p>
							Тестовое Мероприятие 2025 — это пробный запуск, который позволит
							нам протестировать организацию процесса, взаимодействие с
							участниками и качество всех технических решений, задействованных в
							мероприятии. В рамках этого события мы будем проверять не только
							основные моменты, но и тестировать новые форматы, которые могут
							быть использованы в будущем.
						</p>

						<p>
							Мы приглашаем вас стать частью этого эксперимента! Ваше участие и
							обратная связь помогут нам выявить слабые места, улучшить систему
							и сделать основные мероприятия более удобными и эффективными для
							всех. Это уникальная возможность оказать влияние на формат будущих
							событий, а также получить ценную информацию и впечатления.
						</p>

						<p>
							Не пропустите шанс стать частью важного теста и повлиять на
							развитие наших мероприятий! 🔧🎉
						</p>
					</div>
				</div>
				<button onClick={console.log('кнопка нажата')}>
					<p className='h-15 fixed bottom-0 w-[80%] bg-[#820000] active:bg-[#C10F1A] transition-all p-3 rounded-full text-white text-2xl mb-5 mx-[10%] font-semibold'>
						Участвовать
					</p>
				</button>
			</div>
		</>
	)
}

export default OneEventPage
