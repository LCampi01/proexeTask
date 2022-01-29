import React from 'react';
import {
    Navbar, Row, Col, Container
} from 'reactstrap';

const Footer = () => {
    const handleRoute = route => {
        window.location = route;
    };
    return (
        <div color='dark' className="footer-height text-center text-light bg-dark">
            <h1>User management Dashboard</h1>
        </div>
    );
};

export default Footer;
