import { useNavigate } from 'react-router-dom'
import ExamCard from '../components/ExamCard'

function Certificate({}) {
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
				<div className='flex flex-col gap-3'>
					<div className='flex bg-white justify-between h-30 rounded-3xl p-3 '>
						<p className='font-bold text-3xl w-4/7 opacity-75'>
							Справка об обучении
						</p>
						<button className='bg-[#C10F1A] active:scale-97 transition-all text-white font-semibold rounded-xl h-10 w-3/7 self-center'>
							Заказать справку
						</button>
					</div>
					<div className='flex bg-white justify-between h-30 rounded-3xl p-3 '>
						<p className='font-bold text-3xl w-3/5 opacity-75'>
							Справка о доходах
						</p>
						<button className='bg-[#C10F1A] active:scale-97 text-white font-semibold rounded-xl h-10 w-3/7 self-center'>
							Заказать справку
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Certificate
