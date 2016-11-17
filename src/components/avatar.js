import React from 'react';

const Avatar = ({url}) => (
    <img src={url} style={{maxWidth: '32px', borderRadius: '50%'}} alt="User face" />
);

export default Avatar;