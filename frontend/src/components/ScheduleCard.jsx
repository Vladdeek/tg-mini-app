function ScheduleCard({
	Descipline,
	Time,
	Auditoria,
	Teacher,
	isActiveLesson,
}) {
	return (
		<div
			className='w-full h-40 bg-white rounded-2xl flex flex-col gap-2 px-5 pb-6 pt-4 mb-4 transition-all '
			style={{
				boxShadow: isActiveLesson
					? '0 4px 8px rgba(193, 15, 26, 0.31)'
					: '0 4px 8px rgba(0, 0, 0, 0.1)',
				border: isActiveLesson ? '1px solid #C10F1A' : 'none',
			}}
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
