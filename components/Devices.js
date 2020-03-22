import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';

const fetchStyle = {
  marginBottom: '10px',
  outline: 'none'
};

const transferButton = {
  backgroundColor: '#3b454f',
  color: '#fff',
  outline: 'none',
  borderColor: 'gray',
  height: '30px',
  width: '90px',
  cursor: 'pointer',
  marginRight: '5px'
};

const activeButton = {
  backgroundColor: '#3b454f',
  color: 'gray',
  outline: 'none',
  borderColor: 'gray',
  height: '30px',
  width: '90px',
  marginRight: '5px',
  borderStyle: 'inset'
};

const capital = {
  marginBottom: '10px'
};

class Devices extends React.PureComponent {
  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <div style={{ paddingBottom: '' }}>
        <h2 style={capital}>
          <FormattedMessage id="devices.title" />
        </h2>
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        <button
          className="btn btn--dark"
          style={fetchStyle}
          disabled={isFetching}
          onClick={() => {
            fetchAvailableDevices();
          }}
        >
          <FormattedMessage id="devices.fetch" />
        </button>
        {devices.length === 0 ? (
          <p>
            <FormattedMessage id="devices.empty" />
          </p>
        ) : (
          <table>
            <tbody>
              {devices.map(device => (
                <tr>
                  <td>
                    {device.is_active ? (
                      <button disabled style={activeButton} class="btn btn--dark">
                        Aktiv
                      </button>
                    ) : (
                      <button
                        style={transferButton}
                        class="btn btn--dark"
                        onClick={() => {
                          transferPlaybackToDevice(device.id);
                        }}
                      >
                        <FormattedMessage id="devices.transfer" />
                      </button>
                    )}
                  </td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.volume}</td>
                </tr>
              ))}
            </tbody>
            <br></br>
          </table>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId => dispatch(transferPlaybackToDevice(deviceId))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
