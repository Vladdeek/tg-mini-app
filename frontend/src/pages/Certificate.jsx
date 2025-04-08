import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CerModalWin from '../components/CerModalWin'

function Certificate() {
	const [certificates, setCertificates] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedCerType, setSelectedCerType] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		const userId = localStorage.getItem('user_id')
		if (!userId) {
			console.log('Не удалось найти user_id')
			return
		}

		const fetchCertificates = async () => {
			try {
				const userResponse = await fetch(
					`http://192.168.167.48:8000/user/${userId}`
				)
				if (!userResponse.ok)
					throw new Error('Ошибка при получении пользователя')

				const userData = await userResponse.json()
				const userDbId = userData.id

				const response = await fetch(
					`http://192.168.167.48:8000/certificate/${userDbId}`
				)
				if (!response.ok) throw new Error('Ошибка при получении сертификатов')

				const data = await response.json()
				setCertificates(data)
				console.log('Сертификаты из API:', data)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchCertificates()
	}, [])

	const addCertificateLocally = cerTypeId => {
		setCertificates(prev => [
			...prev,
			{
				status_id: 1,
				cer_type: { id: cerTypeId },
			},
		])
	}

	const handleOrderCertificate = async (cerTypeId, count, desc) => {
		const userId = localStorage.getItem('user_id')
		if (!userId) {
			console.log('Не удалось найти user_id')
			return
		}

		try {
			const userResponse = await fetch(
				`http://192.168.167.48:8000/user/${userId}`
			)
			if (!userResponse.ok) throw new Error('Ошибка при получении пользователя')

			const userData = await userResponse.json()
			const userDbId = userData.id

			const currentDate = new Date().toISOString().split('T')[0]

			const response = await fetch('http://192.168.167.48:8000/certificate/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: userDbId,
					cer_type_id: cerTypeId,
					status_id: 1,
					count: Number(count),
					description: desc,
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
				addCertificateLocally(cerTypeId) // 👈 обновляем локально, чтобы сразу показать статус
			} else {
				console.log('Ошибка при заказе справки')
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error)
		}
	}

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

	const getCertificateStatus = cerTypeId => {
		const certificate = certificates.find(
			cert => cert.cer_type.id === cerTypeId
		)
		return certificate ? certificate.status_id : 0
	}

	const openModal = cerTypeId => {
		setSelectedCerType(cerTypeId)
		setIsModalOpen(true)
	}

	return (
		<>
			{isModalOpen && (
				<CerModalWin
					onClose={() => setIsModalOpen(false)}
					onConfirm={(count, desc) => {
						handleOrderCertificate(selectedCerType, count, desc)
						setIsModalOpen(false)
					}}
				/>
			)}

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
						<div className='flex bg-white justify-between h-30 rounded-3xl p-3'>
							<p className='font-bold text-3xl w-4/7 opacity-75'>
								Справка об обучении
							</p>
							<button
								className={`${
									getCertificateStatus(1) === 0 ? 'active:scale-97' : ''
								} bg-[#C10F1A] transition-all text-white font-semibold rounded-xl h-10 w-3/7 self-center`}
								onClick={() => openModal(1)}
								disabled={getCertificateStatus(1) !== 0}
							>
								{getButtonText(getCertificateStatus(1))}
							</button>
						</div>
						<div className='flex bg-white justify-between h-30 rounded-3xl p-3'>
							<p className='font-bold text-3xl w-3/5 opacity-75'>
								Справка о доходах
							</p>
							<button
								className={`${
									getCertificateStatus(2) === 0 ? 'active:scale-97' : ''
								} bg-[#C10F1A] transition-all text-white font-semibold rounded-xl h-10 w-3/7 self-center`}
								onClick={() => openModal(2)}
								disabled={getCertificateStatus(2) !== 0}
							>
								{getButtonText(getCertificateStatus(2))}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Certificate
