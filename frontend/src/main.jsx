import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/login.jsx'
import MainPage from './pages/MainPage.jsx' // Создадим MainPage
import Schedule from './pages/Chapters/Schedule.jsx'
import News from './pages/Chapters/News'
import Events from './pages/Chapters/Events'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/main' element={<MainPage />} />
				<Route path='/schedule' element={<Schedule />} />
				<Route path='/events' element={<Events />} />
				<Route path='/news' element={<News />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
