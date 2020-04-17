using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SwarmPlus.Data;
using SwarmPlus.Models;
using SwarmPlus.Service;
using System;

namespace SwarmPlus
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            // 構成ファイル、環境変数等から、構成情報をロード
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                //.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            // appSetting.jsonの読み込み
            services.Configure<Foursquare>(Configuration.GetSection("Foursquare"));

            // HttpClient追加(https://docs.microsoft.com/ja-jp/aspnet/core/fundamentals/http-requests?view=aspnetcore-2.2#basic-usage)
            services.AddHttpClient<LoginService>();
            services.AddHttpClient<FoursquareAPIService>();

            // DbContext追加(https://docs.microsoft.com/ja-jp/aspnet/core/data/ef-mvc/intro?view=aspnetcore-2.2)
            services.AddDbContext<SwarmPlusContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            );
            services.AddCors(options =>
            {
                options.AddPolicy("SwarmplusPolicy",
                     builder => builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins(new string[] { "https://swarmplus.net", "http://localhost:4200" })
                    );
            });
            services.AddApplicationInsightsTelemetry();
            // In production, the Angular files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseRouting();
            app.UseCors("SwarmplusPolicy");

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseSpaStaticFiles();

            app.UseEndpoints(routes =>
            {
                routes.MapControllerRoute("default", "controller=Home/{action=Index}/id");
            });


            //app.UseSpa(spa =>
            //{
            //    // To learn more about options for serving an Angular SPA from ASP.NET Core,
            //    // see https://go.microsoft.com/fwlink/?linkid=864501

            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseAngularCliServer(npmScript: "start");
            //    }
            //});
        }
    }
}
