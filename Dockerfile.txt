# Use the official ASP.NET Core runtime as base
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy everything
COPY . .


# Restore and build
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Final Stage
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "RetailCliqSyncApp.dll"]
