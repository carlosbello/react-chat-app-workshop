import React from 'react';

const style = {
    borderRadius: '50%',
    maxWidth: '48px',
};

const Avatar = ({url}) => (
    <img src={url} style={style} alt="Avatar" />
);

export default Avatar;