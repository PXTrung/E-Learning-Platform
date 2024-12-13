using E_LearningApi.Data;
using E_LearningApi.Data.Entities;
using E_LearningApi.Middlewares;
using E_LearningApi.Services.Categories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text.Json;
using System.Text;
using System.Text.Json.Serialization;
using E_LearningApi.Services.Auth.Register;
using E_LearningApi.Services.Auth.Login;
using E_LearningApi.Services.Jwt;
using E_LearningApi.Services.Auth.CurrentUsers;
using E_LearningApi.Sieve;
using Sieve.Models;
using Sieve.Services;
using E_LearningApi.Services.Files;
using E_LearningApi.Services.Courses;
using E_LearningApi.Services.Sessions;
using E_LearningApi.Services.Lessons;
using E_LearningApi.Services.Carts;
using Stripe;
using E_LearningApi.Services.Stripe;
using E_LearningApi.Services.Orders;
using E_LearningApi.Services.Enrollments;
using E_LearningApi.Services.CourseGroups;
using E_LearningApi.Services.Ratings;
using E_LearningApi.Services.Emails;
using Hangfire;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;
using Hangfire.MemoryStorage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddEndpointsApiExplorer();

// Add Cors Policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


// Add AutoMapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

// Add Global Exception Handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Add logging
builder.Services.AddLogging();

builder.Services.AddHangfire(cfg =>
{
    cfg.UseMemoryStorage();
});


builder.Services.AddHangfireServer();

// Add HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Increase the capacity of form input
builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 100 * 1024 * 1024);

// Add Services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IFileService, FileServices>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<ILessonService, LessonService>();
builder.Services.AddScoped<ICartService, CartService>();  
builder.Services.AddScoped<IStripeService, StripeService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEnrollmentService, EnrollmentService>();
builder.Services.AddScoped<ICourseGroupService, CourseGroupService>();
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Add DbContext to the container.
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.EnableDetailedErrors();
    opt.EnableSensitiveDataLogging();
});

//Add Swagger
var apiInfo = new OpenApiInfo
{
    Title = "E-Learning API",
    Version = "v1",
    Description = "Web API for E-Learning platform",
    Contact = new OpenApiContact
    {
        Name = "Pham Xuan Trung",

    },
    License = new OpenApiLicense
    {
        Name = "Private License"
    }
};

builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", apiInfo);
        options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
        {
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = JwtBearerDefaults.AuthenticationScheme
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        },
                        Scheme = "Oauth2",
                        Name = JwtBearerDefaults.AuthenticationScheme,
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }
            });
        options.DescribeAllParametersInCamelCase();
        options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"), includeControllerXmlComments: true);
    }
);

// Load configuration
var configuration = builder.Configuration;

// Add Sieve
builder.Services.Configure<SieveOptions>(configuration.GetSection("Sieve"));
builder.Services.AddScoped<ISieveProcessor, ApplicationSieveProcessor>();

// Add Jwt 
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>("COMP1640")
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

builder.Services.Configure<DataProtectionTokenProviderOptions>(opt =>
{
    opt.TokenLifespan = TimeSpan.FromDays(2);
});

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Append("Token-Expired", "true");
                }

                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                context.HandleResponse();
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var serializedError = JsonSerializer.SerializeToUtf8Bytes(new { title = "You are not authorized" });
                var errorJson = Encoding.UTF8.GetString(serializedError);
                context.Response.WriteAsync(errorJson);
                return Task.CompletedTask;
            },
            OnForbidden = context =>
            {
                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";
                var serializedError = JsonSerializer.SerializeToUtf8Bytes(new { title = "You are not authorized to access this resource" });
                var errorJson = Encoding.UTF8.GetString(serializedError);
                context.Response.WriteAsync(errorJson);
                return Task.CompletedTask;
            }

        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    await SeedData.Initialize(services);
}

app.UseHttpsRedirection();

app.UseStaticFiles();


app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
