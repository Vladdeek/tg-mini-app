import { useState, useEffect } from 'react'
import Weekday from '../components/Weekday'
import { useNavigate } from 'react-router-dom'
import ScheduleCard from '../components/ScheduleCard'

function OneNewsPage() {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate('/news')
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
						Тестовая новость: Проверка работы системы!
					</p>
					<div className='flex flex-col text-2xl font-light mb-3 gap-3'>
						<p>
							Внимание! В связи с проведением плановых технических работ,
							сегодня, 2 апреля 2025 года, в 14:00 была запущена проверка работы
							новостной системы. Этот процесс необходим для обеспечения
							бесперебойной работы системы в будущем и улучшения качества
							сервиса.
						</p>

						<p>
							В ходе теста были проверены все основные функции, включая
							правильность отображения заголовков, корректность форматирования
							текста, а также способность системы обрабатывать изображения и
							ссылки. Все компоненты показали стабильную работу, не выявлено
							сбоев.
						</p>

						<p>
							Пользователи, получившие уведомления об этой новости, могут быть
							уверены: никаких реальных событий она не касается, это
							исключительно тест. Цель теста — оценка работы системы в условиях
							реальной загрузки и подготовка её к более сложным операциям.
						</p>

						<p>
							Мы благодарим вас за внимание и уверяем, что такие проверки
							помогут нам поддерживать качество работы на высоком уровне.
							Ожидайте новостей, не связанные с тестированием, в ближайшее
							время.
						</p>

						<p>Спасибо за понимание!</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default OneNewsPage
