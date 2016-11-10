import React from 'react';
import Avatar from './avatar';

const ChatList = ({conversations, onSelectChat}) => (
    <ul>
        {conversations.map(({id, fullName, avatar}) => (
            <li key={id} onClick={() => onSelectChat(id)}>
                <Avatar url={avatar} />
                {fullName}
            </li>
        ))}
    </ul>
);

export default ChatList;