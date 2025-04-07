import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CertificateCard from './components/CertificateCard'

function AdminCertificate({}) {
	const [Data, setData] = useState([])

	useEffect(() => {
		const fetchCertificates = async () => {
			try {
				const response = await fetch(`http://192.168.167.48:8000/certificate/`)
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
							Type={Item.cer_type?.CerType || '—'}
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
