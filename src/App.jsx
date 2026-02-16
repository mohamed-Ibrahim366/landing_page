import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/auth/LoginPage'
import RegisterTypePage from './Pages/auth/RegisterTypePage'
import HealthcareProviderRegistration from './Pages/auth/HealthcareProviderRegistration'
import RegisterLabCenter from './Pages/auth/RegisterLabCenter'
import RegisterImagingCenter from './Pages/auth/RegisterImagingCenter'
import OTPVerification from './Components/registration/OTPVerification'
import RegistrationSubmitted from './Pages/RegistrationSubmitted'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registerType" element={<RegisterTypePage />} />

          <Route path="/register/doctor_registration" element={<HealthcareProviderRegistration/>} />
          <Route path="/register/lab_registration" element={<RegisterLabCenter />} />
          <Route path="/register/imaging_registration" element={<RegisterImagingCenter />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/registration-submitted" element={<RegistrationSubmitted />} />
      
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
