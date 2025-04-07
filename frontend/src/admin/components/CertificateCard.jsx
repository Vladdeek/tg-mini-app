function CertificateCard({ FullName, Group, Count, date, type }) {
	return (
		<div className='flex gap-3 mb-5 bg-white shadow-md rounded-2xl p-3 items-center'>
			<div className='flex flex-col'>
				<p className='text-center font-bold text-2xl'>{type}</p>
				<div className='grid grid-cols-6 opacity-50 text-sm text-center font-light'>
					<p className='col-span-4 '>Ф.И.О.</p>
					<p className='col-span-1 '>Группа</p>
					<p className='col-span-1 '>Кол.</p>
				</div>
				<div className='grid grid-cols-6 text-center font-semibold'>
					<p className='col-span-4 '>{FullName}</p>
					<p className='col-span-1 '>{Group}</p>
					<p className='col-span-1 '>{Count}</p>
				</div>
				<div className='flex gap-2 opacity-50 items-center justify-center'>
					<img src='icons/calendar.svg' alt='' className='h-5' />
					<p>{date}</p>
				</div>
			</div>
			<button className=' bg-[#920000] text-white px-2 h-10 rounded-md active:bg-[#bb0000]'>
				ГОТОВО
			</button>
		</div>
	)
}

export default CertificateCard
