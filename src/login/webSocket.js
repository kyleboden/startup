const UserEvent = {
    System: 'system',
    Login: 'userLogin',
    Logout: 'userLogout',
  };
  
  class EventMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  class UserEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onopen = (event) => {
        this.receiveEvent(new EventMessage('ApplySmart', UserEvent.System, { msg: 'connected' }));
      };
      this.socket.onclose = (event) => {
        this.receiveEvent(new EventMessage('ApplySmart', UserEvent.System, { msg: 'disconnected' }));
      };
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {}
      };
    }
  
    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
      this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
  
      this.handlers.forEach((handler) => {
        handler(event);
      });
    }
  }
  
  const UserNotifier = new UserEventNotifier();
  
  // Example: Notify when a user logs in or out
  function notifyLogin(username) {
    UserNotifier.broadcastEvent(username, UserEvent.Login, { msg: `${username} has logged in` });
  }
  
  function notifyLogout(username) {
    UserNotifier.broadcastEvent(username, UserEvent.Logout, { msg: `${username} has logged out` });
  }
  
  export { UserEvent, UserNotifier, notifyLogin, notifyLogout };
  