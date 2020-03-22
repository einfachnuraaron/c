import React from 'react';
import { voteDown } from '../actions/voteActions';

const buttonStyle = {
  backgroundColor: '#3b454f',
  color: '#fdd835',
  borderColor: 'gray',
  margin: '3px',
  height: '30px',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
};

const buttonStyleX = {
  backgroundColor: '#3b454f',
  color: '#fdd835',
  borderColor: 'gray',
  margin: '3px',
  fontWeight: 'bold',
  height: '30px',
  width: '30px',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
};

const nameStyle = {
  paddingRight: '0px',
  ovderflow: 'hidden'
};

const nameWidth = {
  width: '5px'
};

const tracknameStyle = {
  // whiteSpace: 'nowrap',
  paddingRight: '10px'
};

const pushedStyle = {
  backgroundColor: '#3b454f',
  color: '#fdd835',
  outline: 'none',
  borderColor: '#808080',
  margin: '3px',
  height: '30px',
  borderStyle: 'inset',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
};

export default ({ index, item, session, onRemoveItem, onVoteUp, onVoteDown }) => {
  const voteUp =
    session.user && item.user.id !== session.user.id ? (
      <button
        style={item.voters.filter(v => v.id === session.user.id).length === 1 ? pushedStyle : buttonStyle}
        onClick={onVoteUp}
      >
        ▲
      </button>
    ) : null;
  const voteDown =
    // item.voters.filter(v => v.id === session.user.id).length === 0 &&
    session.user && item.user.id !== session.user.id ? (
      <button
        style={item.downvotes.filter(v => v.id === session.user.id).length === 1 ? pushedStyle : buttonStyle}
        onClick={onVoteDown}
      >
        ▼
      </button>
    ) : null;
  return (
    <table>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th width="40px"></th>
        <th></th>
      </tr>
      <tr>
        <td style={{ paddingRight: '5px' }}>
          <img src={item.track.album.images[2].url} width="40" height="40" />
        </td>
        <td style={{ paddingRight: '10px' }}>{index + 1}</td>
        <td style={tracknameStyle}>{item.track.name}</td>
        <td style={{ paddingRight: '10px' }}>{item.track.artists.map(a => a.name).join(', ')}</td>
        <td style={nameStyle}>
          <a style={nameWidth}>{item.user && (item.user.display_name || item.user.id)}</a>
        </td>
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
            {(item.voters.length - item.downvotes.length) * (item.voters.length - item.downvotes.length) === 1 ? (
              <span style={{ color: '#616161' }}>s</span>
            ) : null}
          </span>
        </td>
      </tr>
    </table>
  );
};
