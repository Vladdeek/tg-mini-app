import { useState, useEffect } from 'react'
import Weekday from '../../components/Weekday'
import { useNavigate } from 'react-router-dom'
import ScheduleCard from '../../components/ScheduleCard'

function Schedule() {
	const [activeIndex, setActiveIndex] = useState(0)
	const [currentTime, setCurrentTime] = useState(new Date()) // Текущее время
	const navigate = useNavigate()

	// Получаем день недели (0 - воскресенье, 1 - понедельник, и т.д.)
	const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

	// Обновляем время каждую минуту
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date())
		}, 60000)
		return () => clearInterval(interval)
	}, [])

	const days = [
		{
			DayName: 'пн',
			DayNum: '31',
			schedule: [
				{ Descipline: 'Математика', Auditoria: '7.101', Time: '8:00-9:20' },
				{ Descipline: 'Физика', Auditoria: '7.202', Time: '9:30-10:50' },
			],
		},
		{
			DayName: 'вт',
			DayNum: '1',
			schedule: [
				{ Descipline: 'История', Auditoria: '7.308', Time: '8:00-9:20' },
				{ Descipline: 'Английский', Auditoria: '7.202', Time: '9:30-10:50' },
			],
		},
		{
			DayName: 'ср',
			DayNum: '2',
			schedule: [
				{
					Descipline: 'Веб-разработка',
					Auditoria: '7.308',
					Time: '8:00-9:20',
					Teacher: 'Букреев Д. А.',
				},
				{
					Descipline: 'Методы оптимизации и исследование операций',
					Auditoria: '7.202',
					Time: '9:30-10:50',
					Teacher: 'Покуса Т. В.',
				},
				{ Descipline: 'Алгоритмы', Auditoria: '9.201', Time: '11:00-12:20' },
			],
		},
		{
			DayName: 'чт',
			DayNum: '3',
			schedule: [
				{
					Descipline: 'Программирование',
					Auditoria: '7.308',
					Time: '8:00-9:20',
				},
				{ Descipline: 'Сети', Auditoria: '7.202', Time: '9:30-10:50' },
			],
		},
		{
			DayName: 'пт',
			DayNum: '4',
			schedule: [
				{ Descipline: 'Веб-разработка', Auditoria: '7.308', Time: '8:00-9:20' },
				{ Descipline: 'Базы данных', Auditoria: '7.202', Time: '9:30-10:50' },
			],
		},
		{
			DayName: 'сб',
			DayNum: '5',
			schedule: [],
		},
		{
			DayName: 'вс',
			DayNum: '6',
			schedule: [],
		},
	]

	// Функция для проверки, идет ли сейчас пара
	const isLessonActive = timeRange => {
		if (activeIndex !== todayIndex) return false // Проверяем только для сегодняшнего дня

		const [start, end] = timeRange.split('-')
		const now = currentTime.getHours() * 60 + currentTime.getMinutes()

		const parseTime = timeStr => {
			const [hours, minutes] = timeStr.split(':').map(Number)
			return hours * 60 + minutes
		}

		const startTime = parseTime(start)
		const endTime = parseTime(end)

		return now >= startTime && now < endTime
	}

	const handleBack = () => {
		navigate('/main')
	}

	return (
		<div className='h-screen w-screen bg-[#820000] flex flex-col justify-end'>
			<button onClick={handleBack}>
				<img
					src='icons/arrow-prev-svgrepo-com.svg'
					alt=''
					className='h-15 fixed top-5 left-5 bg-[#C10F1A] p-3 rounded-[20px]'
				/>
			</button>
			<p className='text-3xl font-bold text-white text-center mb-10'>
				Март 31 - Апрель 6
			</p>
			<div className='w-full flex max-sm:gap-2 gap-0 justify-center mb-5'>
				{days.map((day, index) => (
					<Weekday
						key={index}
						DayName={day.DayName}
						DayNum={day.DayNum}
						isActive={activeIndex === index}
						onClick={() => setActiveIndex(index)}
					/>
				))}
			</div>
			<div className='w-full h-2/3 bg-[#efefef] overflow-y-auto rounded-t-[66px] p-4'>
				{days[activeIndex]?.schedule.length > 0 ? (
					days[activeIndex].schedule.map((lesson, idx) => (
						<ScheduleCard
							key={idx}
							Descipline={lesson.Descipline}
							Auditoria={lesson.Auditoria}
							Time={lesson.Time}
							Teacher={lesson.Teacher}
							isActiveLesson={isLessonActive(lesson.Time)}
						/>
					))
				) : (
					<p className='text-center text-gray-500'>Занятий нет</p>
				)}
			</div>
		</div>
	)
}

export default Schedule
