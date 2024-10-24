import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { NavLink } from "react-router-dom";
import './homeStyles.css';

function Home() {
    const [typeEffect] = useTypewriter({
        words: ['Reliability', 'Security'],
        loop: true,
        typeSpeed: 30,
        deleteSpeed: 10,
    });

    return (
        <>
            <div className="dark-gradient-background"></div>

            <div className="h-screen w-full flex flex-col justify-start items-center relative z-10 px-60">
                <div className="w-full h-full flex flex-col justify-center items-start">
                    <div className="font-gilroyEB text-white text-7xl w-[1200px] break-words leading-[80px]">
                        <div className="tc txc-1" aria-label="Bienvenue sur sercopointweb" style={{ opacity: 1, visibility: 'inherit', transform: 'rotate(-180deg)' }}>
                            <svg viewBox="0 0 100 100">
                                <defs>
                                    <path id="c-1" d="M 50, 50m -25, 0 a 25,25 0 1,1 50,0 a 25,25 0 1,1-50,0"></path>
                                </defs>
                                
                                <text fontSize="8">
                                    <textPath xlinkHref="#c-1" className='text-'>Documents Made Easy by CheckMate</textPath>
                                </text>
                            </svg>
                        </div>

                        <div className='font-albulaLight text-sm mt-[40px] uppercase tracking-[7px]'>Streamlining Document Verification Process with Unmatched Efficiency</div>

                        <p className='mt-[25px] tracking-[3px]'>
                            Empowering You to Verify Your Documents with <span className='text-[#4200e7]'>{typeEffect}</span>
                        </p>
                    </div>

                    <NavLink to="/signup" className="styled-button w-[150px] mt-[80px]"> Get Started </NavLink>
                </div>
            </div>
        </>
    );
}

export default Home;