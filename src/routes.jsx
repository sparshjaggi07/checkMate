import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/navigation/header/header'
import Footer from './components/navigation/footer/footer'
import Home from './pages/home/home'
import Team from './pages/team/team'
import About from './pages/about/about'
import SignUp from './pages/signup/signUp'
import SignIn from './pages/signin/signin'

function WebRoutes() {
	return (
		<>
			<Router>
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
                {/* <Footer /> */}
            </Router>
		</>
	)
}

export default WebRoutes;