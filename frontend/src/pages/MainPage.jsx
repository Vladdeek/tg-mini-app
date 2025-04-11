import { useState, useEffect } from 'react'
import Tabs from '../components/Header'
import Header from '../components/Header'
import ChapterCard from '../components/ChapterCard'
import { useNavigate } from 'react-router-dom'

function MainPage() {
	const navigate = useNavigate()
	const userId = localStorage.getItem('user_id')

	// Состояние для хранения данных пользователя
	const [userData, setUserData] = useState(null)

	// Функция для проверки существования пользователя
	useEffect(() => {
		const checkUserExists = async userId => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/${userId}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				)
				if (!response.ok) {
					throw new Error('Пользователь не найден')
				}
				const data = await response.json()
				console.log('Пользователь:', data)
				setUserData(data) // Сохраняем данные пользователя в состояние
			} catch (error) {
				console.error('Ошибка при отправке запроса:', error)
			}
		}
		checkUserExists(userId)
	}, [])

	return (
		<>
			<Header username={userData ? userData.user_fullname.split(' ')[1] : ''} />
			<div className='p-4'>
				<div
					className='col-span-2 h-50 w-full rounded-4xl bg-white p-5'
					onClick={() => {
						navigate('/schedule')
					}}
				>
					<div className='flex justify-between items-center'>
						<img
							src='icons/calendar-alt-svgrepo-com.svg'
							alt=''
							className='invert-0 h-17'
						/>
						<img
							src='icons/arrow-right-svgrepo-com.svg'
							alt=''
							className='h-12 border-2 invert-100 border-white rounded-2xl mr-3'
						/>
					</div>
					<p className='text-4xl font-bold text-black mt-7'>Расписание</p>
				</div>
				<div className='grid grid-cols-2 grid-rows-2 gap-3 mt-3'>
					<div className='row-span-2 col-span-1'>
						<ChapterCard
							ImagePath={'icons/megaphone.svg'}
							title={'Новости'}
							HandleChapter={() => {
								navigate('/news')
							}}
							big={true}
						/>
					</div>
					<div className='row-span-2 col-span-1'>
						<div className='grid grid-rows-2 gap-3'>
							<ChapterCard
								ImagePath={'icons/party-popper.svg'}
								title={'Мероприятия'}
								HandleChapter={() => {
									navigate('/events')
								}}
								big={false}
							/>
							<ChapterCard
								ImagePath={'icons/file-text.svg'}
								title={'Справки'}
								HandleChapter={() => {
									navigate('/certificate')
								}}
								big={false}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage
