using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using JsBoard.Data;
using JsBoard.Data.Contracts;
using Microsoft.AspNet.SignalR;
using Ninject;

namespace JsBoard.App_Start
{
    public class IocConfig
    {
        public static void RegisterIoC()
        {
            var kernel = new StandardKernel();

            // TODO: Use a Uow instead of sharing repositories!
            kernel.Bind<IPaintSegmentRepository>().To<PaintSegmentRepository>().InSingletonScope();

            
            GlobalHost.DependencyResolver = new NinjectDependencyResolver(kernel);
        }
    }
}