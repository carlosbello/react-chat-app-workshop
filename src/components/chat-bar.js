import React from 'react';

const ChatBar = React.createClass({
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSend(this.input.value);
        this.input.value = '';
    },

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    ref={node => this.input = node}
                    type="text"
                />
                    <button>Send</button>
            </form>
        );
    },
});

export default ChatBar;
