import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Certificate() {
	const [certificates, setCertificates] = useState([]) // Сохраняем все сертификаты
	const navigate = useNavigate()

	useEffect(() => {
		const userId = localStorage.getItem('user_id') // Получаем user_id из localStorage
		if (!userId) {
			console.log('Не удалось найти user_id')
			return
		}

		const fetchCertificates = async () => {
			const userResponse = await fetch(
				`http://192.168.167.48:8000/user/${userId}`
			)
			if (!userResponse.ok) {
				console.log('Ошибка при получении данных пользователя')
				return
			}
			const userData = await userResponse.json()

			// Получаем id пользователя из таблицы User
			const userDbId = userData.id

			try {
				const response = await fetch(
					`http://192.168.167.48:8000/certificate/${userDbId}`
				)
				if (!response.ok) throw new Error('Ошибка при получении сертификатов')
				const data = await response.json()
				setCertificates(data) // Сохраняем все сертификаты
				console.log('Сертификаты из API:', data)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}
		fetchCertificates()
	}, [])

	const handleOrderCertificate = async cerTypeId => {
		const userId = localStorage.getItem('user_id') // Получаем user_id из localStorage
		if (!userId) {
			console.log('Не удалось найти user_id')
			return
		}

		try {
			// Получаем id пользователя из таблицы User
			const userResponse = await fetch(
				`http://192.168.167.48:8000/user/${userId}`
			)
			if (!userResponse.ok) {
				console.log('Ошибка при получении данных пользователя')
				return
			}
			const userData = await userResponse.json()

			const userDbId = userData.id // id из таблицы User

			// Отправляем запрос на создание сертификата
			const currentDate = new Date().toISOString().split('T')[0]

			const response = await fetch('http://192.168.167.48:8000/certificate/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: userDbId,
					cer_type_id: cerTypeId,
					status_id: 1, // Статус "в процессе"
					count: 1,
					date: currentDate,
					user: {
						user_id: 0,
						user_fullname: '',
						user_group: '',
						id: 0,
					},
					cer_type: {
						CerType: '',
						id: 0,
					},
				}),
			})

			if (response.ok) {
				console.log('Справка заказана')
				window.location.reload()
			} else {
				console.log('Ошибка при заказе справки')
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

	// Функция для получения текста кнопки в зависимости от статуса
	const getButtonText = status_id => {
		switch (status_id) {
			case 0:
				return 'Заказать'
			case 1:
				return 'В процессе'
			case 2:
				return 'Готова к выдаче'
			default:
				return ''
		}
	}

	// Получаем статус для каждого типа сертификата
	const getCertificateStatus = cerTypeId => {
		const certificate = certificates.find(
			cert => cert.cer_type.id === cerTypeId
		)
		return certificate ? certificate.status_id : 0
	}

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
				<div className='flex flex-col gap-3'>
					{/* Справка об обучении */}
					<div className='flex bg-white justify-between h-30 rounded-3xl p-3'>
						<p className='font-bold text-3xl w-4/7 opacity-75'>
							Справка об обучении
						</p>
						<button
							className={`${
								getCertificateStatus(1) === 0 ? 'active:scale-97' : ''
							} bg-[#C10F1A] transition-all text-white font-semibold rounded-xl h-10 w-3/7 self-center`}
							onClick={() => handleOrderCertificate(1)}
							disabled={getCertificateStatus(1) !== 0}
						>
							{getButtonText(getCertificateStatus(1))}
						</button>
					</div>

					{/* Справка о доходах */}
					<div className='flex bg-white justify-between h-30 rounded-3xl p-3'>
						<p className='font-bold text-3xl w-3/5 opacity-75'>
							Справка о доходах
						</p>
						<button
							className={`${
								getCertificateStatus(2) === 0 ? 'active:scale-97' : ''
							} bg-[#C10F1A] transition-all text-white font-semibold rounded-xl h-10 w-3/7 self-center`}
							onClick={() => handleOrderCertificate(2)}
							disabled={getCertificateStatus(2) !== 0}
						>
							{getButtonText(getCertificateStatus(2))}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Certificate
