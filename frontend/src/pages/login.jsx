import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [fullName, setFullName] = useState('') //состояние для имени в поле для ввода
	const [groupNumber, setGroupNumber] = useState('') //состояние для номера группы
	const [step, setStep] = useState(1) //состояние для шагов регистрации
	const [isFocused, setIsFocused] = useState(false) //состояние для ебучего фокуса

	const navigate = useNavigate() //состояние для навигации

	const isFullNameValid = fullName.trim().split(' ').length >= 3 //делит fullname на три части по пробелам и проверяет их количество таким образом проверяется ввел ли пользователь полное ФИО
	const isGroupNumberValid = groupNumber.trim().length >= 11 //проверяет длину номера группы

	const isInputEmpty = step === 1 ? !isFullNameValid : !isGroupNumberValid //я хз

	//функция перехода с одного шага регистрации на второй
	const handleNextStep = () => {
		if (step === 1) {
			document.getElementById('form-container').classList.add('fade-out')
			setTimeout(() => {
				setStep(2)
				document.getElementById('form-container').classList.remove('fade-out')
				document.getElementById('form-container').classList.add('fade-in')
			}, 600)
		} else {
			localStorage.setItem('userFullName', fullName) // Сохраняем имя в localStorage
			navigate('/main') //по завершению регистрации
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
					</p> //fullName.split(' ')[1] делит fullname по пробелам и берет имя пользователя
				) : (
					<p className='text-4xl mb-15'>
						Давайте познакомимся – как вас зовут?
					</p>
				)}
				<div
					className={`z-10 w-full max-w-sm flex flex-col items-center transition-opacity duration-300`}
				>
					<label className='w-full flex flex-col text-lg mb-4'>
						<span
							className='text-start uppercase text-md'
							style={{
								color: isFocused ? '#820000' : 'black',
							}}
						>
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
							onFocus={() => setIsFocused(true)} // при фокусе
							onBlur={() => setIsFocused(false)} // при потере фокуса
							style={{
								borderColor: isFocused ? '#820000' : '#b0b0b0',
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
