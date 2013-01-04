using System.Web.Optimization;
using System.Web.Routing;
using JsBoard.App_Start;
using Microsoft.AspNet.SignalR;
using System.Web.Http;
using System.Web.Mvc;

namespace JsBoard
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Configuring SignalR
            IocConfig.RegisterIoC();
            RouteTable.Routes.MapHubs();
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Configuring Asp.Net Mvc
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}