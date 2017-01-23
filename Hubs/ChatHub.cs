using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Angular2Spa.Hubs
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> _logger;
        public static readonly string testGroupName = "test_group";

        public ChatHub(ILogger<ChatHub> logger)
        {
            _logger = logger;
        }

        public override Task OnConnected()
        {
            _logger.LogWarning(
                                  this.Context.ConnectionId + " - Connected"
                              );
            return base.OnConnected();
        }
        

        //rejoin groups if client disconnects and then reconnects
        public override Task OnReconnected()
        {
            _logger.LogWarning(
                                 this.Context.ConnectionId + " ReConnected"
                              );
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _logger.LogWarning(
                                 this.Context.ConnectionId + " DisConnected"
                              );

            return base.OnDisconnected(stopCalled);
        }

        public Task JoinGroup(string groupName)
        {
            return Groups.Add(Context.ConnectionId, groupName);
        }

        public Task LeaveGroup(string groupName)
        {
            return Groups.Remove(Context.ConnectionId, groupName);
        }

        public void Send(string message)
        {
            Clients.All.messageReceived( this.Context.ConnectionId.ToString(), message );
        }
    }
}
