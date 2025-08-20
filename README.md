# Device Connection Surveillance App

> [!NOTE]
> **Status:** 🚧 Ongoing Project  
> Aufgrund meines bald volleren Terminkalenders und schulischer Verpflichtungen könnte der Fortschritt langsamer sein als bisher.

---

## Release v1.0.0
⚠️ **Hinweis:** Diese Version enthält *noch kein Docker-Setup*.

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

GET     /api/devices                → Liste aller Geräte  
POST    /api/devices                → Neues Gerät hinzufügen  
GET     /api/devices/{id}           → Gerätedetails  
PUT     /api/devices/{id}           → Gerät editieren  
DELETE  /api/devices/{id}           → Gerät löschen

GET     /api/devices/scan/{id}      → Gerät via nmap scannen

GET     /api/status_logs            → Liste aller Logs
GET     /api/status_logs/{deviceId} → Lister aller Logs von einem Gerät
POST    /api/status_logs            → Neuen Log-Entry hinzufügen  
DELETE  /api/status_log/{id}        → Log-Entry löschen

            
````


---

Made with ☕ + 💻 by AnonNanoo

Copyright © 2025 AnonNanoo. All Rights Reserved.

