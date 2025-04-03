import { useEffect, useState } from 'react'

function ExamCard({ title, date, score }) {
	return (
		<>
			<div className='flex justify-between items-center mb-5 h-30 bg-white rounded-3xl p-4'>
				<div className='flex flex-col gap-3 w-full'>
					<p className='font-semibold text-lg'>{title}</p>
					<div className='flex justify-between'>
						<div className='flex gap-2 opacity-50'>
							<img src='icons/calendar.svg' alt='' className='h-5' />
							<p>{date}</p>
						</div>
						<p
							className={`rounded-lg w-20 text-center font-semibold text-white ${
								score == 0
									? 'bg-[#dcdcdc]'
									: score <= 2
									? 'bg-[#FF0033]'
									: score == 3
									? 'bg-[#ffcf40]'
									: score >= 4
									? 'bg-[#34c924]'
									: ''
							}`}
						>
							{score >= 1 ? score : 'не сдан'}{' '}
							{score == 0
								? ''
								: score <= 1
								? 'Балл'
								: score <= 4
								? 'Балла'
								: score >= 4
								? 'Баллов'
								: ''}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default ExamCard
