import React from 'react';
import { voteDown } from '../actions/voteActions';

export default ({ index, item, session, onRemoveItem, onVoteUp, onVoteDown }) => {
  const voteUp =
    item.voters && session.user && item.voters.filter(v => v.id === session.user.id).length === 0 ? (
      <button onClick={onVoteUp}>▲</button>
    ) : null;
  const voteDown =
    item.downvotes &&
    session.user &&
    item.user.id !== session.user.id &&
    item.downvotes.filter(v => v.id === session.user.id).length === 0 ? (
      <button onClick={onVoteDown}>▼</button>
    ) : null;
  return (
    <tr>
      <td style={{ paddingRight: '10px' }}>
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </td>
      <td style={{ paddingRight: '10px' }}>{index + 1}</td>
      <td style={{ paddingRight: '10px' }}>{item.track.name}</td>
      <td style={{ paddingRight: '10px' }}>{item.track.artists.map(a => a.name).join(', ')}</td>
      <td style={{ paddingRight: '10px' }}>{item.user && (item.user.display_name || item.user.id)}</td>
      <td>
        {item.user && session.user && item.user.id === session.user.id ? (
          <button
            onClick={() => {
              onRemoveItem(item.id);
            }}
          >
            X
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
