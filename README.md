# Device Connection Surveillance App

> [!NOTE]
> **Status:** 🚧 Ongoing Project  
> Aufgrund meines bald volleren Terminkalenders und schulischer Verpflichtungen könnte der Fortschritt langsamer sein als bisher.  
> ⚠️ **Ganz unten im README finden sie meine Zukunftspläne**

---

## Releases v1
⚠️ **Hinweis:** Enthalten *noch kein Docker-Setup*.

---

### 📝 Kurzbeschreibung
Ein Fullstack-Projekt zur Überwachung von Netzwerkgeräten, prüft automatisch oder manuell, ob Geräte erreichbar sind (online/offline) und visualisiert den Status über eine schön gestaltete Website.

## 🔧 Tech-Stack

- **Frontend**: React + Vite + Tailwind + Shadcn/UI
- **Backend**: Spring Boot + REST + JPA
- **Datenbank**: MySQL (oder H2 für Tests)
- **Features**: Periodischer Reachability-Check (Ping)

## 📋 Features

- Geräte hinzufügen, bearbeiten und löschen
- Automatische Erreichbarkeitsprüfung (z. B. alle 30 Sekunden)
- Anzeige des aktuellen Status (🟢 online / 🔴 offline)
- Logging der Statusänderungen in der Datenbank
- Frontend mit Tabellenansicht / Card-ansicht und Live-Status

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

---

Made with ☕ + 💻 by AnonNanoo

Copyright © 2025 AnonNanoo. All Rights Reserved.
