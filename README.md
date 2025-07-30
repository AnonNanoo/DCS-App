# DCS-App


---


# Device Connection Surveillance App

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

## 🛠️ API-Endpunkte (Beispiel, not final)

```

GET    /api/devices             → Liste aller Geräte
POST   /api/devices             → Neues Gerät hinzufügen
GET    /api/devices/{id}        → Gerätedetails
GET    /api/devices/{id}/status → Aktueller Online-Status
GET    /api/logs?deviceId=1     → Verlauf der Statusprüfungen

````


---

Made with ☕ + 💻 by AnonNanoo

