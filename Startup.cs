[assembly: Microsoft.Owin.OwinStartupAttribute(typeof(app.Startup))]
namespace app
{
    using Owin;
    using Microsoft.AspNet.SignalR;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
