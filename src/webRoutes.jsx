import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/navigation/header/header'
import Footer from './components/navigation/footer/footer'
import Home from './pages/home'
import Team from './pages/team'
import About from './pages/about'

function WebRoutes() {
	return (
		<>
			<Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </Router>
		</>
	)
}

export default WebRoutes