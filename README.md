# 🎓 FullStack Academic Orchestrator

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Un sistem modern și performant de management pentru cadre didactice și departamente universitare. Proiectul demonstrează implementarea unei arhitecturi **Full-Stack** complet containerizate, punând accent pe scalabilitate, consistența mediului de dezvoltare și performanță.

[Image of full stack docker architecture with react spring boot and mysql networking]

## 🛠️ Stack Tehnologic

### **Backend (The Engine)**
* **Framework:** Spring Boot 3.x
* **Limbaj:** Java 17
* **Persistență:** Spring Data JPA (Hibernate)
* **Bază de date:** MySQL 8.0
* **Management Dependențe:** Maven

### **Frontend (The Interface)**
* **Limbaj:** React 18 (TypeScript/JavaScript)
* **Build Tool:** Vite (pentru viteza de dezvoltare)
* **Server Producție:** Nginx (configurat pentru SPA Routing)
* **Client HTTP:** Fetch API

### **Infrastructure**
* **Orchestrare:** Docker & Docker Compose
* **Imagini:** Multi-stage build pentru reducerea dimensiunii imaginilor
* **Networking:** Rețea izolată Docker pentru securitatea comunicării între containere

---

## 🚀 Pornirea Rapidă (Quick Start)

Nu este necesară instalarea locală a Java, Node.js sau MySQL. Proiectul este complet automatizat prin Docker.

### 1. Clonarea proiectului
```bash
git clone [https://github.com/username-ul-tau/FullStack-Academic-Orchestrator.git](https://github.com/username-ul-tau/FullStack-Academic-Orchestrator.git)
cd FullStack-Academic-Orchestrator
```
```docker compose up -d --build```

Frontend (React)	http://localhost:5173	
Backend (API)	http://localhost:8080
Baza de Date	localhost	3306

