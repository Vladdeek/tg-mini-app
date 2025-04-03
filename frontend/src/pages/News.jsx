import { useNavigate } from 'react-router-dom'
import Slider from '../components/Carousel'
import NewsCard from '../components/NewsCard'

function News({}) {
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
				<p className='font-bold text-4xl opacity-75 mb-13'>Срочные новости</p>
				<Slider />
				<p className='font-semibold text-xl opacity-75 mt-5 mb-5'>
					Все новости
				</p>
				<NewsCard
					ImagePath={'https://placehold.co/600x400'}
					title={'ФактДня – самая важная новость дня коротко и по делу.'}
					date={'Апрель 2, 2025'}
					HandleNews={() => {
						navigate('/new')
					}}
				/>
				<NewsCard
					ImagePath={'https://placehold.co/600x400'}
					title={'НеожиданОчка – шокирующие или просто неожиданные события.'}
					date={'Апрель 1, 2025'}
					HandleNews={() => {
						navigate('/new')
					}}
				/>
				<NewsCard
					ImagePath={'https://placehold.co/600x400'}
					title={'АпдейтВселенскойВажности – обновления и крупные анонсы.'}
					date={'Март 31, 2025'}
					HandleNews={() => {
						navigate('/new')
					}}
				/>
			</div>
		</div>
	)
}

export default News
