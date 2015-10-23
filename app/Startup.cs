using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(app.Startup))]
namespace app
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
