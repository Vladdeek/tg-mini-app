import { useState } from 'react'
import Tabs from '../components/Header'
import Header from '../components/Header'
import ChapterCard from '../components/ChapterCard'
import { useNavigate } from 'react-router-dom'

function MainPage() {
	const navigate = useNavigate()
	return (
		<>
			<Header />
			<div className='grid grid-cols-2 gap-3 p-3'>
				<ChapterCard
					ImagePath={'icons/megaphone.svg'}
					title={'Новости'}
					HandleChapter={() => {
						navigate('/news')
					}}
				/>
				<ChapterCard
					ImagePath={'icons/party-popper.svg'}
					title={'Мероприятия'}
					HandleChapter={() => {
						navigate('/events')
					}}
				/>
				<ChapterCard
					ImagePath={'icons/book-check.svg'}
					title={'Экзамены'}
					HandleChapter={() => {
						navigate('/schedule')
					}}
				/>
				<ChapterCard
					ImagePath={'icons/file-text.svg'}
					title={'Справки'}
					HandleChapter={() => {
						navigate('/schedule')
					}}
				/>
			</div>
		</>
	)
}

export default MainPage
