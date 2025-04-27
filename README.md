# Full Stack Application with Angular, .NET Core, and PostgreSQL

Modern bir web uygulaması için tasarlanmış bu proje üç ana bileşenden oluşur:
- **Angular 19** ile geliştirilmiş UI Katmanı
- **.NET Core 7** Web API ile yazılmış Backend
- **PostgreSQL 15** veritabanı
- **Docker** ile containerize edilmiş ortam

## 📋 Teknolojiler
| Component      | Technology Stack                     |
|----------------|--------------------------------------|
| Frontend       | Angular 19, TypeScript, RxJS        |
| Backend        | .NET Core 7, Entity Framework Core 7 |
| Database       | PostgreSQL 15                        |
| Testing        | xUnit, Moq                           |
| Containerization| Docker 24+, Docker Compose 2.20+     |

## ⚙️ Kurulum Ön Gereksinimleri
- [Node.js v18+](https://nodejs.org/)
- [.NET Core SDK 7.0](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac)
- Code Editor (VS Code veya Visual Studio 2022+)

## 🚀 Kurulum
```bash
# 1. Repoyu klonla
git clone https://github.com/coodingDs/patient-tracking-app.git
cd patient-tracking-app

# 2. Angular bağımlılıklarını yükle
cd client
npm install

# 3. .NET bağımlılıklarını restore et
cd ../patient-tracking-api
dotnet restore

# 4. PostgreSQL container'ını başlat
cd ..
docker-compose up -d db