import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CertificateCard from './components/CertificateCard'

function AdminCertificate({}) {
	const [Data, setData] = useState([])

	const updateCertificateStatus = async id => {
		console.log('✅ id', id)
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/certificates/${id}/update-status`,
				{
					method: 'PUT',
				}
			)

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.detail || 'Не удалось обновить статус')
			}

			const data = await response.json()
			console.log('✅ Статус обновлён:', data)
			setData(prevData => prevData.filter(item => item.id !== id))
		} catch (error) {
			console.error('❌ Ошибка при обновлении статуса:', error)
		}
	}

	useEffect(() => {
		const fetchCertificates = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/certificate/`
				)
				if (!response.ok) throw new Error('Ошибка при получении сертификатов')
				const data = await response.json()
				setData(data)
				console.log('сертификаты из API:', data)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}
		fetchCertificates()
	}, [])

	return (
		<div className='p-5'>
			<div className='flex flex-col'>
				{Data.length > 0 ? (
					Data.map(Item => (
						<CertificateCard
							key={Item.id}
							id={Item.id}
							FullName={Item.user?.user_fullname || 'Неизвестный'}
							date={Item.date}
							Group={Item.user?.user_group || '—'}
							Count={Item.count}
							description={Item.description}
							type={Item.cer_type?.CerType || '—'}
							UpdateStatus={() => updateCertificateStatus(Item.id)}
						/>
					))
				) : (
					<p className='text-center text-gray-500'>Заявок нет</p>
				)}
			</div>
		</div>
	)
}

export default AdminCertificate
