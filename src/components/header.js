import React from 'react';

const headerStyle = {
    display: 'flex',
    background: '#4040a0',
    height: 56,
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
    padding: '0 8px',
};

const buttonStyle = {
    border: 'none',
    background: 'transparent',
    width: 24,
    height: 24,
    padding: 0,
    margin: '0 8px 0 0',
};

const Header = ({title, icon, onIconClick}) => (
    <header style={headerStyle}>
        {icon && (
            <button onClick={onIconClick} style={buttonStyle}>
                <img src={icon} alt="Conversation icon"/>
            </button>
        )}
        <h1>{title}</h1>
    </header>
);

export default Header;