import { useNavigate } from 'react-router-dom'
import ExamCard from '../components/ExamCard'

function Exams({}) {
	const navigate = useNavigate()
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
				<p className='font-bold text-4xl opacity-75 mb-5'>Экзамены</p>
				<ExamCard
					title={'TEST экзамен еще не сдан'}
					date={'Июль 9, 2025'}
					score={'0'}
				/>
				<ExamCard
					title={'TEST экзамен написан на 1'}
					date={'Июль 9, 2025'}
					score={'1'}
				/>
				<ExamCard
					title={'TEST экзамен написан на 2'}
					date={'Июль 9, 2025'}
					score={'2'}
				/>
				<ExamCard
					title={'TEST экзамен написан на 3'}
					date={'Июль 9, 2025'}
					score={'3'}
				/>
				<ExamCard
					title={'TEST экзамен написан на 4'}
					date={'Июль 9, 2025'}
					score={'4'}
				/>
				<ExamCard
					title={'TEST экзамен написан на 5'}
					date={'Июль 9, 2025'}
					score={'5'}
				/>
			</div>
		</div>
	)
}

export default Exams
