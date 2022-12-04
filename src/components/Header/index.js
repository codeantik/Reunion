import './styles.css';
import { useState } from 'react';
import NightShelterRoundedIcon from '@mui/icons-material/NightShelterRounded';

export const Header = () => {

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className='header-container'>
            <div className="header-left">
                <div className="logo">
                    <div className='logo-container'>
                        <NightShelterRoundedIcon  className='logo-icon'/>
                    </div>
                    <p className='logo-text'>Estatery</p>
                </div>
                <div className={`${isNavExpanded ? 'header-tabs expanded' : 'header-tabs'}`}>
                    <div>Rent</div>
                    <div>Buy</div>
                    <div>Sell</div>
                    <div>Manage Property</div>
                    <div>Resources</div>
                </div>
            </div>
            <div className={`${isNavExpanded ? 'header-right expanded' : 'header-right'}`}>
                <button>
                    Login
                </button>
                <button>
                    Sign up
                </button>
            </div>
            <button
                    className="hamburger"
                    onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            >
                    {/* icon from Heroicons.com */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                    height={24}
                    width={24}
                >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
                </svg>
            </button>
        </nav>
    )
}