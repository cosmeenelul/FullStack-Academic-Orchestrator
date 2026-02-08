# 🎓 FullStack Academic Orchestrator

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Un sistem modern și performant de management pentru cadre didactice și departamente universitare. Proiectul demonstrează implementarea unei arhitecturi **Full-Stack** complet containerizate, aflată într-o rețea Docker.

[arhitectura-retea.png]

## 🛠️ Stack Tehnologic

### **Backend **
* **Framework:** Spring Boot 3
* **Limbaj:** Java 17
* **Persistență:** Spring Data JPA (Hibernate)
* **Bază de date:** MySQL 8.0
* **Management Dependențe:** Maven

### **Frontend**
* **Limbaj:** React 18 (JavaScript)
* **Build Tool:** Vite 
* **Server Producție:** Nginx
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
docker compose up -d --build
docker ps
```
### **Accesarea Serviciilor**
* **Frontend (React)**:	http://localhost:5173	
* **Backend (API)**:	http://localhost:8080

## 🏗️ Arhitectura de Rețea Docker

Proiectul utilizează o rețea de tip `bridge` izolată, numită `prof-dep-network`, care permite comunicarea securizată între containere folosind rezoluția numelui (DNS intern).


### 🖥️ Servicii și Fluxul de Date

* **Frontend (Nginx):**
    * **Rol:** Servește fișierele statice rezultate din build-ul de React (Vite).
    * **Networking:** Ascultă pe portul `80` în interiorul rețelei Docker, dar este mapat pe portul **`5173`** pe laptopul tău (Host).
* **Backend (Spring Boot):**
    * **Rol:** Gestionează logica de business și expune endpoint-urile REST.
    * **Networking:** Comunică cu baza de date folosind direct numele containerului: `mysql-prof-dep-container` pe portul `3306`.
* **Database (MySQL):**
    * **Rol:** Stocarea persistentă a datelor despre profesori și departamente.
    * **Persistență:** Utilizează un volum Docker persistent numit `mysql-data-prof-dep`. Aceasta asigură că datele tale rămân intacte chiar dacă oprești sau ștergi containerele.
    * **Acces extern:** Este mapat pe portul **`3307`** pe host pentru a permite interogări din unelte precum MySQL Workbench sau IntelliJ, fără a intra în conflict cu alte baze de date locale.

---

## 📂 Persistența Datelor (Docker Volumes)

Pentru a asigura integritatea datelor, am implementat un volum extern gestionat de Docker:

```yaml
volumes:
  mysql-data-prof-dep:
    driver: local
