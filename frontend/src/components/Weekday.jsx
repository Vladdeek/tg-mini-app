function Weekday({ DayName, DayNum, isActive, onClick }) {
	return (
		<div
			onClick={onClick}
			className={` h-25 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all ${
				isActive ? 'bg-white text-[#C10F1A]' : 'bg-[#ffffff33] text-white'
			}`}
		>
			<p className='font-semibold text-3xl text-center w-20'>{DayNum}</p>
			<p className='font-thin text-xl'>{DayName}</p>
		</div>
	)
}

export default Weekday
