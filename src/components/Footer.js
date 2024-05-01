import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <nav>
                </nav>
                <div className="copyright">
                    Copyright &copy; 2024 Computer Architecture Project  | www.nd.edu
                </div>
            </div>
            <div className="affiliation">
                <p>
                    <a href="https://www.nd.edu" target="_blank" rel="noopener noreferrer">
                        {}
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
