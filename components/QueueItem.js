import React from 'react';
import { voteDown } from '../actions/voteActions';
import { NonceProvider } from 'react-select';

const buttonStyle = {
  backgroundColor: '#3b454f',
  color: '#fdd835',
  outline: 'none',
  borderColor: 'gray',
  margin: '3px',
  height: '30px'
};

const buttonStyleX = {
  backgroundColor: '#3b454f',
  color: '#fdd835',
  outline: 'none',
  borderColor: 'grey',
  margin: '3px',
  fontWeight: 'bold',
  height: '30px',
  width: '30px'
};

const nameStyle = {
  paddingRight: '10px',
  width: '5px',
  ovderflow: 'hidden'
};

export default ({ index, item, session, onRemoveItem, onVoteUp, onVoteDown }) => {
  const voteUp =
    session.user && item.user.id !== session.user.id ? (
      <button style={buttonStyle} onClick={onVoteUp}>
        ▲
      </button>
    ) : null;
  const voteDown =
    // item.voters.filter(v => v.id === session.user.id).length === 0 &&
    session.user && item.user.id !== session.user.id ? (
      <button style={buttonStyle} onClick={onVoteDown}>
        ▼
      </button>
    ) : null;
  return (
    <tr>
      <td style={{ paddingRight: '10px' }}>
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </td>
      <td style={{ paddingRight: '10px' }}>{index + 1}</td>
      <td style={{ paddingRight: '10px' }}>{item.track.name}</td>
      <td style={{ paddingRight: '10px' }}>{item.track.artists.map(a => a.name).join(', ')}</td>
      <td style={nameStyle}>{item.user && (item.user.display_name || item.user.id)}</td>
      <td>
        {item.user && session.user && item.user.id === session.user.id ? (
          <button
            style={buttonStyleX}
            onClick={() => {
              onRemoveItem(item.id);
            }}
          >
            ✕
          </button>
        ) : (
          voteUp
        )}
        {voteDown}
      </td>
      <td>
        <span>
          <nobr>
            {(item.voters.length - item.downvotes.length) * (item.voters.length - item.downvotes.length) === 1
              ? item.voters.length - item.downvotes.length + ' vote'
              : item.voters.length - item.downvotes.length + ' votes'}
          </nobr>
        </span>
      </td>
    </tr>
  );
};
