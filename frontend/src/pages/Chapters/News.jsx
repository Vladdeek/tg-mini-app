import { useNavigate } from 'react-router-dom'
import Slider from '../../components/Carousel'
import NewsCard from '../../components/NewsCard'

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
					ImagePath={
						'https://i.pinimg.com/736x/b0/36/bd/b036bdb7fd1ccd463298f02295f8c8f7.jpg'
					}
					title={'Новость чел не умеет рулить в gta vice city'}
					date={'Апрель 2, 2025'}
					HandleNews={() => {
						navigate('/main')
					}}
				/>
				<NewsCard
					ImagePath={
						'https://i.pinimg.com/736x/48/41/2c/48412ca0fc63d0a89e465d5652c8302f.jpg'
					}
					title={'Новость как я это жду'}
					date={'Апрель 1, 2025'}
					HandleNews={() => {
						navigate('/main')
					}}
				/>
				<NewsCard
					ImagePath={
						'https://i.pinimg.com/736x/40/8f/b3/408fb394fbf57ad2fead8980d6e8e608.jpg'
					}
					title={'Новость капец я в шоке'}
					date={'Март 31, 2025'}
					HandleNews={() => {
						navigate('/main')
					}}
				/>
			</div>
		</div>
	)
}

export default News
