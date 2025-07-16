var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSession(); // ✅ Required

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseSession(); // ✅ Required before UseEndpoints
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");
app.Urls.Add("http://0.0.0.0:5016");
app.Run();
