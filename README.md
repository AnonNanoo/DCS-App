
---

<div align="center">

# Device Connection Surveillance App

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/AnonNanoo/DCS-App?display_name=tag\&label=Latest%20Release\&color=brightgreen)](https://github.com/AnonNanoo/DCS-App/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/AnonNanoo/DCS-App?label=Contributors\&color=gold)](https://github.com/AnonNanoo/DCS-App/graphs/contributors)
[![GitHub last commit](https://img.shields.io/github/last-commit/AnonNanoo/DCS-App?label=Last%20Commit\&color=teal)](https://github.com/AnonNanoo/DCS-App/commits/main)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/AnonNanoo/DCS-App?label=Monthly%20Commits\&color=blue)](https://github.com/AnonNanoo/DCS-App/pulse)

</div>

> \[!NOTE]
> **Status:** 🚧 Ongoing Project
> Due to my increasingly busy schedule and school commitments, progress might be slower than before.
> ⚠️ **Further down there’s a tutorial, and at the very end of the README you can find my future plans!**

---

## Releases v1

⚠️ **Note:** *No Docker setup included yet.*

---

### 📝 Short Description

A fullstack project for monitoring network devices. It automatically or manually checks whether devices are reachable (online/offline) and visualizes the status on a nicely designed website.

---                        

## 👀 Preview
![20250827-0620-12 4113460](https://github.com/user-attachments/assets/72c98c55-352a-4d14-8db5-d01454bf8be7)

## 🔧 Tech-Stack

* **Frontend**: <a href="https://www.typescriptlang.org/"> <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white"/> </a> <a href="https://react.dev/"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=blue"/> </a> <a href="https://shadcn.com/" target="_blank"> <img src="https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white" alt="Shadcn"/> </a> <a href="https://reactbits.dev/" target="_blank"> <img src="https://img.shields.io/badge/React%20Bits-000000?style=for-the-badge&logo=https://reactbits.dev/assets/react-bits-logo-BEVRCkxh.svg&logoColor=white" alt="React Bits"/> </a> <a href="https://vitejs.dev/" target="_blank"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/> </a> <a href="https://tailwindcss.com/" target="_blank"> <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/> </a>

* **Backend**: <a href="https://spring.io/projects/spring-boot"> <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/> </a> <a href="https://jakarta.ee/specifications/persistence/" target="_blank"> <img src="https://img.shields.io/badge/JPA-6DB33F?style=for-the-badge&logo=java&logoColor=white" alt="JPA"/> </a>

* **Database**: <a href="https://www.mysql.com/"> <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/> </a>

* **Features**: <a href="https://nmap.org/"> <img src="https://img.shields.io/badge/Nmap-9BE000?style=for-the-badge&logo=nmap&logoColor=black"/> </a> (Host Reachability Check)

## 📋 Features

* Add, edit, and delete devices
* Automatic reachability check (e.g., every 30 seconds)
* Display of current status (🟢 online / 🔴 offline)
* Logging of status changes in the database
* Frontend with table view / card view and live status

---

## 🚀 Tutorial: Start DCS-App

### 1️⃣ Create Database

Before running the application, the database must be created.
Make sure **not to use a dash `-` in the name**, as MySQL has issues with it.
Example:

```sql
CREATE DATABASE dcs_app;
```

---

### 2️⃣ Configure Backend

1. Go to the backend directory.
2. Create the file:

```
src/main/resources/application.properties
```

3. Adjust the database credentials found in `application.properties.example`:

```properties
spring.application.name=backend

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/dcs_app
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# CORS and Redirect Configuration
frontend.url=http://localhost:3000
```

> **Note:** `spring.jpa.hibernate.ddl-auto=update` ensures that tables are automatically created if they do not yet exist.

---

### 3️⃣ Start Backend

In the backend folder:

```bash
./mvnw spring-boot:run
```

Or, if Maven is installed globally:

```bash
mvn spring-boot:run
```

The backend will run on:

```
http://localhost:8080
```

---

### 4️⃣ Start Frontend

1. Go to the frontend directory.
2. Install dependencies:

```bash
npm install --force
```

3. Start the development environment:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:3000
```

---

### 5️⃣ Test

* Open the frontend in your browser: `http://localhost:3000`
* Add a device, check its status, and watch the logs.
* All changes are automatically saved in the `dcs_app` database.

---

## 🛠️ API Endpoints (final)

```

GET     /api/devices                           → List all devices  
POST    /api/devices                           → Add a new device  
GET     /api/devices/{id}                      → Device details  
PUT     /api/devices/{id}                      → Edit device  
DELETE  /api/devices/{id}                      → Delete device

GET     /api/devices/scan/{id}                 → Scan device via nmap

GET     /api/status_logs                       → List all logs
GET     /api/status_logs/{deviceId}            → List all logs of a device
GET     /api/status_logs/latest/{deviceId}     → Latest log entry of a device         
POST    /api/status_logs                       → Add new log entry  
DELETE  /api/status_log/{id}                   → Delete log entry

            
```

---

## 🔮 Future Vision

### Planned Features

1. **CIDR Block Support**
   Currently, only individual IPs can be checked (via `nmap -sn` on specific addresses).
   In the future, it will be possible to scan entire **CIDR ranges** (e.g., `192.168.0.0/24`):

   * Automatic resolution of the range into individual IPs
   * Detection of all active hosts within a subnet

2. **Docker Setup**
   Full Docker deployment for easy and portable setup.

3. **Advanced Status Reports**

   * Historical uptime statistics
   * Export options (CSV, JSON)
   * Notifications on status changes

4. **Professional Speed Tests**

   * Measure download/upload speed and latency per device
   * Integration of standardized test methods (e.g., via `speedtest-cli` or similar APIs)
   * Display results in clear graphs and tables on the frontend
   * Optional automatic periodic testing for continuous monitoring data

---

Made with ☕ + 💻 by AnonNanoo

Copyright © 2025 AnonNanoo. All Rights Reserved.

---
