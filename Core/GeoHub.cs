namespace HereIYam.Core
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;

    [HubName("geo")]
    public class GeoHub : Hub
    {
        public void MyLocation(double lat, double lng)
        {
            Clients.All.multicast(lat, lng);
        }
    }
}