import { useEffect, useState } from 'react'

function ChapterCard({ ImagePath, title, HandleChapter, big }) {
	return (
		<div
			className={`flex flex-col justify-between h-full w-full rounded-3xl bg-[#820000] py-3 px-4
			}`}
			onClick={HandleChapter}
		>
			<div className='flex justify-between items-center'>
				<img
					src={ImagePath}
					alt=''
					className={`invert-100 ${big ? 'h-15' : 'h-10'}`}
				/>
				<img
					src='icons/arrow-right-svgrepo-com.svg'
					alt=''
					className='h-10 rotate-[-45deg]'
				/>
			</div>
			<p
				className={`${
					big ? 'text-3xl m-2' : 'text-lg'
				} font-semibold text-white mt-2`}
			>
				{title}
			</p>
		</div>
	)
}

export default ChapterCard
