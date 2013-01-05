using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace JsBoard.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // external libraries' bundle
            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                "~/Scripts/libs/jquery-{version}.js",
                "~/Scripts/libs/jquery-ui-{version}.js",

                "~/Scripts/libs/jquery.signalR-{version}-rc1.js",

                "~/Scripts/libs/knockout-{version}.js",
                "~/Scripts/libs/knockout-{version}.debug.js",

                "~/Scripts/libs/raphael.js",

                "~/Scripts/libs/json2.js",

                "~/Scripts/libs/require.js"));

            // application scripts' bundle
            bundles.Add(new ScriptBundle("~/bundles/app")
                .IncludeDirectory("~/Scripts/app", "*.js", false));

            // styles' bundle
            bundles.Add(new StyleBundle("~/bundles/styles")
                .Include("~/Content/eggplant/jquery-ui-{version}.custom.css",
                        "~/Content/site.css"));

            //BundleTable.EnableOptimizations = true; uncomment this for publishing
        }
    }
}
