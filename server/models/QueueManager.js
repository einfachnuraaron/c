const fs = require('fs');

class QueueManager {
  constructor(options) {
    this.playingContext = {
      track: null,
      user: null,
      startTimestamp: null
    };
    this.queue = [];
    this.onQueueChanged = options.onQueueChanged;
    this.onQueueEnded = options.onQueueEnded;
    this.onPlay = options.onPlay;
    this.getToken = options.getToken;
    this.spotifyApi = options.spotifyApi;
    this.playedHistory = [];
  }

  handleQueueChanged() {
    this.sort();
    this.save();
    this.onQueueChanged();
  }

  getPlayingContext() {
    return this.playingContext;
  }

  setPlayingContext() {
    this.playingContext = {
      track: null,
      user: null,
      startTimestamp: null
    };
  }

  getQueue() {
    return this.queue;
  }

  sort() {
    this.queue.sort((a, b) => {
      const diffVoters = b.voters.length - b.downvotes.length - (a.voters.length - a.downvotes.length);
      if (diffVoters !== 0) {
        return diffVoters;
      } else {
        return a.queuedTimestamp - b.queuedTimestamp;
      }
    });
  }

  addItem(queueItem) {
    this.queue.push(queueItem);
    this.handleQueueChanged();
    if (this.playingContext.track === null) {
      this.play();
    }
  }

  removeId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index !== -1 && this.queue[index].user.id === user.id) {
      this.queue.splice(index, 1);
      this.handleQueueChanged();
    }
  }

  init() {
    this.play();
  }

  play() {
    console.log('api.js > play');
    if (this.queue.length > 0) {
      console.log('api.js > play has queue');
      // something to play!
      const queueItem = this.queue.shift();
      this.handleQueueChanged();
      this.playingContext = {
        track: queueItem.track,
        user: queueItem.user,
        startTimestamp: Date.now(),
        voters: queueItem.voters
      };
      this.playedHistory.push({
        track: queueItem.track,
        user: queueItem.user
      });
      setTimeout(() => {
        this.play();
      }, 2000 + queueItem.track.duration_ms);
      this.onPlay();
    } else {
      this.playingContext = {
        track: null,
        user: null,
        startTimestamp: null,
        voters: []
      };

      this.onQueueEnded();
    }
  }

  voteUpId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) return false;
    const voters = this.queue[index].voters;
    const downvotes = this.queue[index].downvotes;
    if (voters) {
      const userVotes = voters.filter(v => v.id === user.id);
      if (userVotes.length === 0) {
        if (downvotes) {
          const userDownvotes = downvotes.filter(v => v.id === user.id);
          if (userDownvotes !== 0) {
            this.queue[index].downvotes.splice(user, 1);
          }
          this.queue[index].voters.push(user);
        }
        this.handleQueueChanged();
        return true;
      }
      return false;
    }
  }

  voteDownId(user, id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) return false;
    const voters = this.queue[index].voters;
    const downvotes = this.queue[index].downvotes;
    if (downvotes) {
      const userVotes = downvotes.filter(v => v.id === user.id);
      if (userVotes.length === 0) {
        if (voters) {
          const userVotes = voters.filter(v => v.id === user.id);
          if (userVotes !== 0) {
            this.queue[index].voters.splice(user, 1);
          }
          this.queue[index].downvotes.push(user);
        }
        if (voters.length - downvotes.length < -2) {
          this.queue.splice(index, 1);
          this.handleQueueChanged();
        } else {
          this.handleQueueChanged();
        }
        return true;
      }
      return false;
    }
  }

  // voteDownId(user, id) {
  //   const index = this.queue.findIndex(item => item.id === id);
  //   if (index === -1) return false;
  //   const voters = this.queue[index].voters;
  //   const downvotes = this.queue[index].downvotes;
  //   // if (item.downvotes.filter(v => v.id === user.id).length === 0) {
  //   this.queue[index].downvotes.push(user);
  //   this.handleQueueChanged();
  //   if (voters.length - downvotes.length < -2) {
  //     this.queue.splice(index, 1);
  //     this.handleQueueChanged();
  //   }
  //   return true;
  //   // }
  // }

  save() {
    fs.writeFileSync(
      './queue.json',
      JSON.stringify({
        playingContext: this.playingContext,
        queue: this.queue
      }),
      ''
    );
  }

  read() {
    try {
      const data = JSON.parse(fs.readFileSync('./queue.json'));
      this.playingContext = data.playingContext;
      this.queue = data.queue;
    } catch (e) {
      // do nothing;
    }
  }
}

module.exports = QueueManager;
