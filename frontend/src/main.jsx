import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/login.jsx'
import MainPage from './pages/MainPage.jsx' // Создадим MainPage
import Schedule from './pages/Schedule.jsx'
import News from './pages/News.jsx'
import Events from './pages/Events.jsx'
import Exams from './pages/Exams.jsx'
import Certificate from './pages/Certificate.jsx'
import Profile from './pages/Profile.jsx'
import OneEventPage from './pages/OneEventPage.jsx'
import OneNewsPage from './pages/OneNewsPage.jsx'
import Logo from './pages/logo.jsx'
import AllNews from './pages/AllNews.jsx'
import AdminCertificate from './admin/AdminCertificate.jsx'
import Error from './pages/Error.jsx'

createRoot(document.getElementById('root')).render(
	<>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Logo />} />
				<Route path='/login' element={<Login />} />
				<Route path='/main' element={<MainPage />} />
				<Route path='/schedule' element={<Schedule />} />
				<Route path='/events' element={<Events />} />
				<Route path='/news' element={<News />} />
				<Route path='/exams' element={<Exams />} />
				<Route path='/certificate' element={<Certificate />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/events/:id' element={<OneEventPage />} />
				<Route path='/news/:id' element={<OneNewsPage />} />
				<Route path='/allnews/' element={<AllNews />} />
				<Route path='/admincertificate/' element={<AdminCertificate />} />
				<Route path='/505/' element={<Error />} />
			</Routes>
		</BrowserRouter>
	</>
)
