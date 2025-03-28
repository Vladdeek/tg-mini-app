import { useState } from 'react'

function Login() {
	const [fullName, setFullName] = useState('')
	const [groupNumber, setGroupNumber] = useState('')
	const [step, setStep] = useState(1)
	const [isFocused, setIsFocused] = useState(false)

	const isFullNameValid = fullName.trim().split(' ').length >= 3
	const isGroupNumberValid = groupNumber.trim().length >= 11

	const isInputEmpty = step === 1 ? !isFullNameValid : !isGroupNumberValid

	const handleNextStep = () => {
		if (step === 1) {
			document.getElementById('form-container').classList.add('fade-out')
			setTimeout(() => {
				setStep(2)
				document.getElementById('form-container').classList.remove('fade-out')
				document.getElementById('form-container').classList.add('fade-in')
			}, 600)
		} else {
			console.log('Подтверждение регистрации')
		}
	}

	return (
		<div
			id='form-container'
			className='h-screen w-screen flex flex-col justify-center items-center text-center p-10'
		>
			<div className={`transition-all ${isFocused ? 'mb-85' : ''}`}>
				{step !== 1 ? (
					<p className='text-4xl mb-15 text-center text-black z-10 relative'>
						Привет, {fullName.split(' ')[1] || fullName}👋
					</p>
				) : (
					<p className='text-4xl mb-15'>
						Давайте познакомимся – как вас зовут?
					</p>
				)}
				<div
					className={`z-10 w-full max-w-sm flex flex-col items-center transition-opacity duration-300`}
				>
					<label className='w-full flex flex-col text-lg mb-4'>
						<span className='text-start uppercase text-md'>
							{step === 1 ? 'Полное имя' : 'Номер группы'}
						</span>
						<input
							type='text'
							placeholder={step === 1 ? 'Иванов Иван Иванович' : '2211-0101.1'}
							value={step === 1 ? fullName : groupNumber}
							onChange={e =>
								step === 1
									? setFullName(e.target.value)
									: setGroupNumber(e.target.value)
							}
							className='text-start border-b-2 border-solid outline-none py-1 w-full transition-all'
							onFocus={() => setIsFocused(true)} // При фокусе
							onBlur={() => setIsFocused(false)} // При потере фокуса
							style={{
								borderColor: isFocused ? '#820000' : '#b0b0b0', // Меняем цвет границы
							}}
						/>
						<span className='text-center text-xs text-black font-thin mt-2'>
							{step === 1
								? 'Мы используем ваше имя для персонализации приложения.'
								: 'Мы используем ваш номер группы для персонализации приложения.'}
						</span>
					</label>
					<button
						className={`mt-6 rounded-full flex justify-center items-center gap-7 ${
							isInputEmpty ? 'cursor-default' : 'cursor-pointer'
						} text-white font-semibold py-3 text-2xl w-2/3 transition-all`}
						style={{ backgroundColor: isInputEmpty ? '#b0b0b0' : '#820000' }}
						disabled={isInputEmpty}
						onClick={handleNextStep}
					>
						<p className={`${step === 1 ? 'ml-17' : ''}`}>
							{step === 1 ? 'Далее' : 'Подтвердить'}
						</p>
						<img
							src='icons/arrow-right-svgrepo-com.svg'
							alt=''
							className={`h-10 ${step === 1 ? '' : 'hidden'}`}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Login
