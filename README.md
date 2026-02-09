# 🎓 FullStack Academic Orchestrator
***Puteți accesa aplicația la adresa:*** http://63.182.19.214/

[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/Deployed_on-AWS_Lightsail-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/lightsail/)
[![Docker Hub](https://img.shields.io/badge/Images_on-Docker_Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/cosmeenelul)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)


Un sistem modern și performant de management pentru cadre didactice și departamente universitare. Proiectul demonstrează implementarea unei arhitecturi **Full-Stack** complet containerizate, care se află într-o rețea Docker, migrată din mediul de dezvoltare local în **Cloud (AWS)** folosind Amazon Lightsail și un flux de lucru de tip CI/CD manual.

## 📷 Imagini Demo ale Aplicației
![Pagina Home](./docs/home.jpg)
![Pagina Departamente](./docs/departamente.jpg)
![Pagina Profesori](./docs/profesori.jpg)
![Profesor Nou Modal](./docs/profesor-nou.jpg)
![Schimbare Director](./docs/schimbare-director.jpg)
![Profil Profesor](./docs/profil-profesor.jpg)


## 📷 Arhitectura Rețelei
![Arhitectură Rețea](./docs/arhitectura-retea.png)

## 🛠️ Stack Tehnologic

### **Backend**
* **Framework:** Spring Boot 3
* **Limbaj:** Java 17
* **Persistență:** Spring Data JPA (Hibernate)
* **Bază de date:** MySQL 8.0
* **Management Dependențe:** Maven

### **Frontend**
* **Limbaj:** JavaScript
* * **Framework:** React 18
* * **Librarie:** Chakra UI
* **Build Tool:** Vite 
* **Server Producție:** Nginx
* **Client HTTP:** Fetch API

## ⚙️ Infrastructure & DevOps Architecture

* **Orchestrare Multi-Container:** Utilizarea **Docker Compose** pentru definirea și gestionarea întregului stack și pentru deploy pe server.
* **Repository Containere:** Am utilizat *Docker Hub* pentru a urca imaginile create local, ulterior folosind-ule pentru un deploy rapid si fluid.
* **Imagini Optimizate (Multi-Stage Builds):** Implementarea strategiei de *Multi-Stage Build* pentru a separa mediul de compilare de cel de rulare, rezultând imagini de producție de dimensiuni reduse și securitate sporită.
* **Networking Izolat & Securizat:** Arhitectură de rețea privată de tip *bridge*, care izolează baza de date și backend-ul de accesul public. Comunicarea între servicii se realizează exclusiv prin DNS-ul intern Docker.
* **High Availability & Auto-Healing:** Configurare de politici de restart (`on-failure`) și mecanisme de **Healthcheck**, asigurând repornirea automată a serviciilor în caz de erori critice.
* **Cloud Performance Tuning:** Optimizarea instanței VPS prin configurarea de **Virtual Memory (SWAP)** pentru a gestiona eficient consumul de resurse al JVM-ului și al bazei de date.

---

## 🚀 Pornirea Rapidă (Quick Start)

Aveți nevoie de Docker instalat, dar nu este necesară instalarea locală a Java, Node.js sau MySQL. Proiectul este complet automatizat prin Docker.

### Deploy rapid (producție/server)
```bash
cd mysql-init/
docker compose up -f docker-compose.prod.yaml -d
docker ps
```


### Deploy rapid (local)
```bash
git clone [https://github.com/username-ul-tau/FullStack-Academic-Orchestrator.git](https://github.com/username-ul-tau/FullStack-Academic-Orchestrator.git)
cd FullStack-Academic-Orchestrator
docker compose up -d --build
docker ps
```


### **Accesare Web App Local:** http://localhost
### **Accesare Web App Producție:** http://IP-UL TAU PUBLIC


## 🏗️ Arhitectura de Rețea Docker

Proiectul utilizează o rețea de tip `bridge` izolată, numită `prof-dep-network`, care permite comunicarea securizată între containere folosind rezoluția numelui (DNS intern).


### 🖥️ Servicii și Fluxul de Date

* **Frontend (Nginx):**
    * **Rol:** Servește fișierele statice rezultate din build-ul de React (Vite).
    * **Networking:** Ascultă pe portul `80` în interiorul rețelei Docker, și este mapat pe portul **`80`**.
* **Backend (Spring Boot):**
    * **Rol:** Gestionează logica de business și expune endpoint-urile REST.
    * **Networking:** Comunică cu baza de date folosind direct numele containerului: `mysql-prof-dep-container` pe portul `3306`.
* **Database (MySQL):**
    * **Rol:** Stocarea persistentă a datelor despre profesori și departamente.
    * **Persistență:** Utilizează un volum Docker persistent numit `mysql-data-prof-dep`. Aceasta asigură că datele rămân intacte chiar dacă se opresc containerele.
    * **Acces extern:** Este mapat pe portul **`3307`** pe host pentru a permite interogări

---

## 📂 Persistența Datelor (Docker Volumes)

Pentru a asigura integritatea datelor, am implementat un volum extern gestionat de Docker:

```yaml
volumes:
  mysql-data-prof-dep:
    driver: local
