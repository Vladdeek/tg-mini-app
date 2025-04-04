import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Profile() {
	const navigate = useNavigate()
	const userId = localStorage.getItem('user_id')

	// Состояние для хранения данных пользователя и группы
	const [userData, setUserData] = useState(null)
	const [groupData, setGroupData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// Функция для проверки существования пользователя
	useEffect(() => {
		const checkUserExists = async () => {
			if (!userId) {
				setError('Пользователь не найден')
				setLoading(false)
				return
			}

			try {
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
				setUserData(data) // Сохраняем данные пользователя в состояние
				setLoading(false)
			} catch (error) {
				setError('Ошибка при отправке запроса на пользователя')
				setLoading(false)
			}
		}

		checkUserExists()
	}, [userId])

	// Функция для получения информации о группе
	useEffect(() => {
		const fetchGroupInfo = async () => {
			if (userData && userData.user_group) {
				try {
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
					setGroupData(data) // Сохраняем данные группы в состояние
				} catch (error) {
					setError('Ошибка при отправке запроса на группу')
				}
			}
		}

		fetchGroupInfo()
	}, [userData])

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
						className='h-15 p-3 rounded-[12px] shadow-md bg-[#00000025]'
					/>
				</button>
				<div className='flex justify-center'>
					<img
						src='https://placehold.co/45x45'
						alt=''
						className='h-35 rounded-full bg-[#fefefe]'
					/>
				</div>
				<div className='grid grid-cols-6 gap-3 mt-10'>
					<div className='col-span-4'>
						<p className='font-thin'>Ф.И.О.</p>
						<p className='opacity-75 border-b-1 border-solid text-md'>
							{userData ? userData.user_fullname : ''}
						</p>
					</div>
					<div className='col-span-2'>
						<p className='font-thin'>Группа</p>
						<p className='opacity-75 border-b-1 border-solid text-md'>
							{userData ? userData.user_group : ''}
						</p>
					</div>
					<div className='col-span-6'>
						<p className='font-thin'>Факультет</p>
						<p className='opacity-75 border-b-1 border-solid text-md'>
							{groupData ? groupData.faculty : ''}
						</p>
					</div>
					<div className='col-span-6'>
						<p className='font-thin'>Кафедра</p>
						<p className='opacity-75 border-b-1 border-solid text-md'>
							{groupData ? groupData.department : ''}
						</p>
					</div>
					<div className='col-span-6'>
						<p className='font-thin'>Профиль</p>
						<p className='opacity-75 border-b-1 border-solid text-md'>
							{groupData ? groupData.profile : ''}
						</p>
					</div>
					<div className='col-span-6'>
						<p className='font-thin'>Специальность</p>
						<p className='opacity-75 border-b-1 border-solid text-md'>
							{groupData ? groupData.specialty : ''}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
