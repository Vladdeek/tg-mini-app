function Weekday({ DayName, DayNum, isActive, onClick }) {
	return (
		<div
			onClick={onClick}
			className={`flex flex-col w-auto text-white items-center justify-center px-4 py-2 rounded-2xl cursor-pointer transition-all`}
			style={{
				backgroundColor: isActive ? '#C10F1A' : '',
			}}
		>
			<p className='font-thin'>{DayName}</p>
			<p className='font-semibold'>{DayNum}</p>
		</div>
	)
}

export default Weekday
