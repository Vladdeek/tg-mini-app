import { useState } from 'react'
import { X } from 'lucide-react'

function CerModalWin({ onClose, onConfirm }) {
	const [isCountFocused, setIsCountFocused] = useState(false)
	const [isDescFocused, setIsDescFocused] = useState(false)

	const [Count, setCount] = useState('')
	const [Desc, setDesc] = useState('')

	const isCount = Count.trim().length >= 1
	const isDesc = Desc.trim().length >= 1
	const isInputEmpty = !isCount || !isDesc

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#00000025] backdrop-blur-[3px]'>
			<div className='relative flex flex-col justify-center items-center bg-white shadow-md rounded-2xl p-5 w-full max-w-md'>
				<button
					onClick={onClose}
					className='absolute top-3 right-3 text-gray-400 hover:text-black transition-colors'
				>
					<X size={24} />
				</button>

				<label className='w-full flex flex-col text-lg mb-4'>
					<input
						type='number'
						placeholder='Количество копий'
						value={Count}
						onChange={e => setCount(e.target.value)}
						className='text-start border-b-2 border-solid outline-none py-1 w-full transition-all'
						onFocus={() => setIsCountFocused(true)}
						onBlur={() => setIsCountFocused(false)}
						style={{
							borderColor: isCountFocused ? '#820000' : '#b0b0b0',
						}}
					/>
				</label>

				<label className='w-full flex flex-col text-lg mb-4'>
					<input
						type='text'
						placeholder='Комментарий'
						value={Desc}
						onChange={e => setDesc(e.target.value)}
						className='text-start border-b-2 border-solid outline-none py-1 w-full transition-all'
						onFocus={() => setIsDescFocused(true)}
						onBlur={() => setIsDescFocused(false)}
						style={{
							borderColor: isDescFocused ? '#820000' : '#b0b0b0',
						}}
					/>
					<span className='text-center text-xs text-black font-thin mt-2'>
						Мы используем эти данные для более точной реализации справки.
					</span>
				</label>

				<button
					className={`mt-6 rounded-full flex justify-center items-center gap-7 ${
						isInputEmpty ? 'cursor-default' : 'cursor-pointer'
					} text-white font-semibold py-3 text-2xl w-2/3 transition-all`}
					style={{ backgroundColor: isInputEmpty ? '#b0b0b0' : '#820000' }}
					disabled={isInputEmpty}
					onClick={() => onConfirm(Count, Desc)}
				>
					Подтвердить
				</button>
			</div>
		</div>
	)
}

export default CerModalWin
