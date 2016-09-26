using System;
using System.Threading.Tasks;
using System.Text;
using System.Net.WebSockets;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Angular2Spa
{
    public class WebSocketHandler
    {
        public const int BufferSize = 4096;

        WebSocket socket;

        WebSocketHandler(WebSocket socket)
        {
            this.socket = socket;
        }

        async Task SocketConnection()
        {
            var buffer = new ArraySegment<Byte>(new Byte[BufferSize]);

            while (this.socket.State == WebSocketState.Open)
            {

                var token = CancellationToken.None;
                var received = await this.socket.ReceiveAsync(buffer, token);

                switch (received.MessageType)
                {
                    case WebSocketMessageType.Text:

                        // Decode Websocket request data
                        var request = Encoding.UTF8.GetString(buffer.Array, buffer.Offset, buffer.Count);
                        
                        // Call Eventing system handler
                        var result = EventingPropagator(request);

                        // Return payload
                        await this.socket.SendAsync(result, WebSocketMessageType.Text, true, token);

                        break;
                    case WebSocketMessageType.Binary:
                        //await this.socket.SendAsync(buffer.Array);
                        break;
                    case WebSocketMessageType.Close:

                        break;
                }

                // var incoming = await this.socket.ReceiveAsync(seg, CancellationToken.None);
                // var outgoing = new ArraySegment<byte>(buffer, 0, incoming.Count);
                // await this.socket.SendAsync(outgoing, WebSocketMessageType.Text, true, CancellationToken.None);
                // }
            }
        }

        /// <summary>
        /// Websocket EventHandler 
        /// </summary>
        /// <returns type="ArraySegment<Byte>">Returns buffer for Websocket</returns>
        /// <param name="data" type="EventHandlerData">Pass in Event/Payload Object (method calls / payload / etc)</param>
        static ArraySegment<Byte> EventingPropagator(string data)
        {

            var serializedData = JsonConvert.DeserializeObject(data);

            // Call actual methods / reflection or something
            //typeof(MyType).GetMethod("add").Invoke(null, new [] {arg1, arg2})

            // SerializeObject & Get bytes
            var result = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data));

            // Return to new ArraySegment Bytes for WS
            return new ArraySegment<Byte>(result);
        }

        static async Task Acceptor(HttpContext hc, Func<Task> n)
        {
            if (!hc.WebSockets.IsWebSocketRequest)
                return;

            var socket = await hc.WebSockets.AcceptWebSocketAsync();
            var handler = new WebSocketHandler(socket);
            await handler.SocketConnection();
        }

        /// <summary>
        /// Adds Websockets to the request pipeline: "ws|wss://" SocketHandler 
        /// </summary>
        /// <param name="app" type="IApplicationBuilder">Pass in the IApplicationBuilder from StartUp config</param>
        public static void Map(IApplicationBuilder app)
        {
            app.UseWebSockets();
            app.Use(WebSocketHandler.Acceptor);
        }

    }
}
