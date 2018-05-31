FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
RUN apt-get -qq update && apt-get install -my wget gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x |  bash -
RUN apt-get install -y nodejs
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY Asp2017.csproj .
RUN apt-get -qq update && apt-get -qq -y install bzip2
RUN dotnet restore ./Asp2017.csproj
COPY . .
WORKDIR /src/
RUN dotnet build Asp2017.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Asp2017.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "Asp2017.dll"]
