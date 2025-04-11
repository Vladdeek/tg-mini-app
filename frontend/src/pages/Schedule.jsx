import { useState, useEffect } from 'react'
import Weekday from '../components/Weekday'
import { useNavigate } from 'react-router-dom'
import ScheduleCard from '../components/ScheduleCard'
import { motion } from 'framer-motion'

function Schedule() {
	const [Data, setData] = useState([])
	const userId = localStorage.getItem('user_id')

	const [userData, setUserData] = useState(null)
	const [groupData, setGroupData] = useState(null)

	const Time = [
		{ Time: '8:00-9:20' },
		{ Time: '9:30-10:50' },
		{ Time: '11:00-12:20' },
		{ Time: '12:30-13:50' },
		{ Time: '14:00-15:20' },
		{ Time: '15:30-16:50' },
		{ Time: '17:00-18:20' },
		{ Time: '18:00-19:50' },
	]

	const [days, setDays] = useState([
		{ DayName: 'пн', DayNum: '7', schedule: [] },
		{ DayName: 'вт', DayNum: '8', schedule: [] },
		{ DayName: 'ср', DayNum: '9', schedule: [] },
		{ DayName: 'чт', DayNum: '10', schedule: [] },
		{ DayName: 'пт', DayNum: '11', schedule: [] },
		{ DayName: 'сб', DayNum: '12', schedule: [] },
		{ DayName: 'вс', DayNum: '13', schedule: [] },
	])

	useEffect(() => {
		const checkUserExists = async () => {
			const response = await fetch(
				`http://192.168.167.48:8000/user/${userId}`,
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				}
			)
			if (!response.ok) {
				throw new Error('Пользователь не найден')
			}
			const data = await response.json()
			console.log('данные из API:', data)
			setUserData(data)
		}

		checkUserExists()
	}, [userId])

	useEffect(() => {
		const fetchGroupInfo = async () => {
			if (userData && userData.user_group) {
				const response = await fetch(
					`http://192.168.167.48:8000/groupinfo/${userData.user_group}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				)
				if (!response.ok) {
					throw new Error('Группа не найдена')
				}
				const data = await response.json()
				console.log('данные из API:', data)
				setGroupData(data)
			}
		}

		fetchGroupInfo()
	}, [userData])

	useEffect(() => {
		const fetchCertificates = async () => {
			if (groupData && groupData.id) {
				const response = await fetch(
					`http://192.168.167.48:8000/schedule/${groupData.id}`
				)
				if (!response.ok) throw new Error('Ошибка при получении расписания')
				const data = await response.json()
				setData(data)
				console.log('данные из API:', data)

				const updatedDays = [...days]

				data.forEach(item => {
					const dayIndex = updatedDays.findIndex(
						day => day.DayName === item.weekday.weekday
					)

					if (dayIndex !== -1) {
						const pairNumber = item.number
						const time = Time[pairNumber - 1]?.Time || 'время не указано'

						updatedDays[dayIndex].schedule.push({
							time,
							subject: item.subject.subject,
							teacher: item.teacher.teacher,
							auditoria: item.auditoria.auditoria,
							number: pairNumber,
						})
					}
				})

				setDays(updatedDays)
			}
		}
		fetchCertificates()
	}, [groupData])

	const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

	const [activeIndex, setActiveIndex] = useState(todayIndex)
	const [currentTime, setCurrentTime] = useState(new Date())
	const navigate = useNavigate()

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date())
		}, 60000)
		return () => clearInterval(interval)
	}, [])

	const isLessonActive = timeRange => {
		if (activeIndex !== todayIndex) return false

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
		<div className='h-screen w-screen flex flex-col justify-end bg-[#820000]'>
			<button onClick={handleBack}>
				<img
					src='icons/arrow-prev-svgrepo-com.svg'
					alt=''
					className='h-15 fixed top-5 left-5 bg-[#ffffff33] p-3 rounded-xl'
				/>
			</button>
			<p className='text-3xl font-bold text-white text-center mb-10'>
				Апрель 7-13
			</p>
			<div className='flex px-5 gap-5 mb-5 overflow-x-auto overscroll-x-auto'>
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
			<div className='w-full h-2/3 bg-[#efefef] overflow-y-auto rounded-t-3xl p-4'>
				{days[activeIndex]?.schedule.length > 0 ? (
					days[activeIndex].schedule.map(
						({ subject, auditoria, time, teacher }, idx) => (
							<motion.div
								key={`${activeIndex}-${idx}`}
								initial={{ opacity: 0, y: 20, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									delay: idx * 0.15,
									duration: 0.45,
									ease: 'easeOut',
								}}
							>
								<ScheduleCard
									Descipline={subject}
									Auditoria={auditoria}
									Time={time}
									Teacher={teacher}
									isActiveLesson={isLessonActive(time)}
								/>
							</motion.div>
						)
					)
				) : (
					<p className='text-center text-gray-500'>Занятий нет</p>
				)}
			</div>
		</div>
	)
}

export default Schedule
