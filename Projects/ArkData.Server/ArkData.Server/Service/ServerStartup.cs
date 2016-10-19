﻿using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace ArkData.Server
{
    class ServerStartup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{action}/{id}",
                defaults: new { controller = "Ark",  id = RouteParameter.Optional }
            );
            appBuilder.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            appBuilder.UseWebApi(config);
        }
    }
}
