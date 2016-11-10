import React from 'react';

const Avatar = ({url}) => (
    <img src={url} style={{maxWidth: '32px', borderRadius: '50%'}} />
);

export default Avatar;