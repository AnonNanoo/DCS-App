<div align="center">
  
# Device Connection Surveillance App

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/AnonNanoo/DCS-App?display_name=tag&label=Latest%20Release&color=brightgreen)](https://github.com/AnonNanoo/DCS-App/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/AnonNanoo/DCS-App?label=Contributors&color=gold)](https://github.com/AnonNanoo/DCS-App/graphs/contributors)
[![GitHub last commit](https://img.shields.io/github/last-commit/AnonNanoo/DCS-App?label=Last%20Commit&color=teal)](https://github.com/AnonNanoo/DCS-App/commits/main)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/AnonNanoo/DCS-App?label=Monthly%20Commits&color=blue)](https://github.com/AnonNanoo/DCS-App/pulse)
</div>

> [!NOTE]
> **Status:** 🚧 Ongoing Project  
> Aufgrund meines bald volleren Terminkalenders und schulischer Verpflichtungen könnte der Fortschritt langsamer sein als bisher.  
> ⚠️ **Weiter unten gibt es ein Tutorial und ganz unten im README finden sie meine Zukunftspläne!**

---

## Releases v1
⚠️ **Hinweis:** Enthalten *noch kein Docker-Setup*.

---

### 📝 Kurzbeschreibung
Ein Fullstack-Projekt zur Überwachung von Netzwerkgeräten, prüft automatisch oder manuell, ob Geräte erreichbar sind (online/offline) und visualisiert den Status über eine schön gestaltete Website.

## 🔧 Tech-Stack

- **Frontend**:  
  <a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white"/>
  </a>
  <a href="https://react.dev/">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=blue"/>
  </a>
  <a href="https://shadcn.com/" target="_blank">
    <img src="https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white" alt="Shadcn"/>
  </a>
  <a href="https://reactbits.dev/" target="_blank">
  <img src="https://img.shields.io/badge/React%20Bits-000000?style=for-the-badge&logo=https://reactbits.dev/assets/react-bits-logo-BEVRCkxh.svg&logoColor=white" alt="React Bits"/>
  </a>
  <a href="https://vitejs.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  </a>
  
- **Backend**:  
  <a href="https://spring.io/projects/spring-boot">
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  </a>
  <a href="https://jakarta.ee/specifications/persistence/" target="_blank">
  <img src="https://img.shields.io/badge/JPA-6DB33F?style=for-the-badge&logo=java&logoColor=white" alt="JPA"/>
  </a>
  
- **Datenbank**:  
  <a href="https://www.mysql.com/">
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  </a>

- **Features**:  
  <a href="https://nmap.org/">
  <img src="https://img.shields.io/badge/Nmap-9BE000?style=for-the-badge&logo=nmap&logoColor=black"/>
  </a>(Host Reachability-Check)

## 📋 Features

- Geräte hinzufügen, bearbeiten und löschen
- Automatische Erreichbarkeitsprüfung (z. B. alle 30 Sekunden)
- Anzeige des aktuellen Status (🟢 online / 🔴 offline)
- Logging der Statusänderungen in der Datenbank
- Frontend mit Tabellenansicht / Card-ansicht und Live-Status


---

## 🚀 Tutorial: DCS-App starten

### 1️⃣ Datenbank erstellen

Bevor die Applikation läuft, muss die Datenbank angelegt werden.
Achte darauf, **keinen Bindestrich `-` im Namen zu verwenden**, da MySQL Probleme damit hat.
Beispiel:

```sql
CREATE DATABASE dcs_app;
```

---

### 2️⃣ Backend konfigurieren

1. Gehe ins Backend Verzeichnis.
2. Kreiere die Datei:

```
src/main/resources/application.properties
```

3. Passe die Datenbank Zugangsdaten, die in der application.properties.example zu finden sind an:

```properties
spring.application.name=backend

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/dcs_app
spring.datasource.username=DEIN_DB_BENUTZERNAME
spring.datasource.password=DEIN_DB_PASSWORT
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# CORS and Redirect Configuration
frontend.url=http://localhost:3000
```

> **Hinweis:** `spring.jpa.hibernate.ddl-auto=update` sorgt dafür, dass die Tabellen automatisch erstellt werden, wenn sie noch nicht existieren.

---

### 3️⃣ Backend starten

Im Ordner des Backends:

```bash
./mvnw spring-boot:run
```

oder, falls du Maven global installiert hast:

```bash
mvn spring-boot:run
```

Das Backend läuft dann auf:

```
http://localhost:8080
```

---

### 4️⃣ Frontend starten

1. Gehe ins Frontend Verzeichnis.
2. Installiere die Abhängigkeiten:

```bash
npm install --force
```

3. Starte die Entwicklungsumgebung:

```bash
npm run dev
```

Das Frontend läuft dann auf:

```
http://localhost:3000
```

---

### 5️⃣ Testen

* Öffne das Frontend im Browser: `http://localhost:3000`
* Füge ein Gerät hinzu, prüfe den Status und beobachte die Logs.
* Alle Änderungen werden automatisch in der Datenbank `dcs_app` gespeichert.

---

## 🛠️ API-Endpunkte (final)

```

GET     /api/devices                           → Liste aller Geräte  
POST    /api/devices                           → Neues Gerät hinzufügen  
GET     /api/devices/{id}                      → Gerätedetails  
PUT     /api/devices/{id}                      → Gerät editieren  
DELETE  /api/devices/{id}                      → Gerät löschen

GET     /api/devices/scan/{id}                 → Gerät via nmap scannen

GET     /api/status_logs                       → Liste aller Logs
GET     /api/status_logs/{deviceId}            → Liste aller Logs von einem Gerät
GET     /api/status_logs/latest/{deviceId}     → Neuester Log-Entry eines Gerätes         
POST    /api/status_logs                       → Neuen Log-Entry hinzufügen  
DELETE  /api/status_log/{id}                   → Log-Entry löschen

            
````

---

## 🔮 Future Vision

### Geplante Features

1. **CIDR-Block-Unterstützung**  
   Momentan können nur einzelne IPs überprüft werden (via `nmap -sn` auf bestimmte Adressen).  
   Zukünftig soll die Möglichkeit bestehen, ganze **CIDR-Ranges** (z. B. `192.168.0.0/24`) zu scannen:  
   - Automatische Auflösung der Range in einzelne IPs  
   - Erkennung aller aktiven Hosts innerhalb eines Subnetzes  

2. **Docker-Setup**  
   Bereitstellung eines vollständigen Docker-Deployments zur einfachen und portablen Bereitstellung.

3. **Erweiterte Statusberichte**  
   - Historische Uptime-Statistiken  
   - Exportfunktionen (CSV, JSON)  
   - Benachrichtigungen bei Statusänderungen  

4. **Professionelle Speedtests**

   * Messung von Download-/Upload-Geschwindigkeit und Latenz pro Gerät
   * Integration von standardisierten Testmethoden (z. B. via `speedtest-cli` oder ähnliche APIs)
   * Darstellung der Ergebnisse in übersichtlichen Graphen und Tabellen im Frontend
   * Optionale automatische Periodik für kontinuierliche Monitoring-Daten

---

Made with ☕ + 💻 by AnonNanoo

Copyright © 2025 AnonNanoo. All Rights Reserved.
