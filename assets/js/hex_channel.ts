import { Presence } from 'phoenix';
import { value } from './components/Hand';

const HexChannel = {
  state: {},
  init(socket: { channel: (arg0: string, arg1: {}) => any }, hexID: any) {
    const room = hexID; // Hex ID or Name
    const channel = socket.channel('hex:' + room, {});
    const presence = new Presence(channel);
    let presences = {};
    channel
      .join()
      .receive('ok', (resp: any) => {
        console.log('Joined successfully', resp);
      })
      .receive('error', (resp: any) => {
        console.log('Unable to join', resp);
      });

    channel.on('hex_state', (msg: {}) => {
      this.state = msg;
      console.log(this.state);
    });

    channel.on('presence_state', (state: {}) => {
      presences = Presence.syncState(presences, state);
      console.log(presences);
    });

    channel.on('select_card', (msg: {}) => {
      channel
        .push('selected_card', { card_id: value, room_name: `hex:${room}` })
        .receive('ok', (resp: any) => {
          console.log('Card selected successfully', resp);
        })
        .receive('error', (resp: any) => {
          console.log('Card not', resp);
        });
    });
  }
};

export default HexChannel;
