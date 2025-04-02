import { useEffect, useState } from 'react'

function ChapterCard({ ImagePath, title, HandleChapter }) {
	return (
		<div
			className='h-40 w-full rounded-4xl bg-gradient-to-t from-[#820000] to-red-500 p-5'
			onClick={HandleChapter}
		>
			<div className='flex justify-between items-center'>
				<img src={ImagePath} alt='' className='invert-100 h-12' />
				<img
					src='icons/arrow-right-svgrepo-com.svg'
					alt=''
					className='h-10 border-2 border-white rounded-xl mr-1'
				/>
			</div>
			<p className='text-2xl font-bold text-white mt-5'>{title}</p>
		</div>
	)
}

export default ChapterCard
