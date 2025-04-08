function CertificateCard({
	FullName,
	Group,
	Count,
	date,
	type,
	UpdateStatus,
	description,
}) {
	return (
		<>
			<div className='flex gap-3 mb-5 bg-white shadow-md rounded-2xl p-3 items-center'>
				<div className='flex flex-col w-full'>
					<p className='text-black text-center font-bold text-xl border-b-1 mb-2'>
						{type}
					</p>
					<div className='grid grid-cols-6 md:grid-cols-3 opacity-50 text-sm text-center font-light'>
						<p className='col-span-4 md:col-span-1 '>Ф.И.О.</p>
						<p className='col-span-1 md:col-span-1'>Группа</p>
						<p className='col-span-1 md:col-span-1'>Кол.</p>
					</div>
					<div className='grid grid-cols-6 md:grid-cols-3 text-center font-semibold border-b-1 mb-2'>
						<p className='col-span-4 md:col-span-1'>{FullName}</p>
						<p className='col-span-1 md:col-span-1'>{Group}</p>
						<p className='col-span-1 md:col-span-1'>{Count}</p>
					</div>
					<div className='grid grid-cols-5'>
						<div className='col-span-1 flex gap-2 opacity-50 items-center justify-start '>
							<img src='icons/calendar.svg' alt='' className='h-5' />
							<p>{date}</p>
						</div>
						<p className='col-span-3 opacity-50 text-sm text-center font-light'>
							Комментарий
						</p>
					</div>
					<p className='text-black text-center font-normal text-sm '>
						{description}
					</p>
				</div>

				<button
					className=' bg-[#920000] text-white px-2 h-10 rounded-md active:bg-[#bb0000]'
					onClick={UpdateStatus}
				>
					ГОТОВО
				</button>
			</div>
		</>
	)
}

export default CertificateCard
