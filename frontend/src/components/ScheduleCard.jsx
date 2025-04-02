function ScheduleCard({
	Descipline,
	Time,
	Auditoria,
	Teacher,
	isActiveLesson,
}) {
	return (
		<div
			className={`w-full h-40 bg-white rounded-[50px] flex flex-col gap-2 px-5 pb-6 pt-4 mb-4 transition-all shadow-lg ${
				isActiveLesson ? 'shadow-[#C10F1A50] border-1 border-[#C10F1A]' : ''
			}`}
		>
			<p className='ml-2 text-xl h-3/5 font-semibold'>{Descipline}</p>
			<p className='ml-2 text-md h-1/5 font-thin'>{Teacher}</p>
			<div className='flex h-1/5 justify-between items-center'>
				<p className='ml-2 text-md text-start opacity-75 font-medium'>{Time}</p>
				<p className='text-md text-center bg-[#C10F1A] px-4 rounded-full text-white text-lg font-bold'>
					{Auditoria}
				</p>
			</div>
		</div>
	)
}

export default ScheduleCard
