# 🎓 FullStack Academic Orchestrator
***Puteți accesa aplicația la adresa:*** http://63.182.19.214/

[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/Deployed_on-AWS_Lightsail-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/lightsail/)
[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Docker Hub](https://img.shields.io/badge/Images_on-Docker_Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/cosmeenelul)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)


Un sistem  management pentru cadre didactice și departamente universitare. Proiectul implementeaza o arhitectura Full-Stack complet **containerizata**, orchestrata prin **Docker Compose** și gazduita în **Cloud (AWS Lightsail)**. Ciclul de viata al aplicatiei este sustinut de un **pipeline CI/CD** complet automatizat prin **GitHub Actions**, eliminand nevoia de deployment manual.

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


### **DevOps & Cloud**
* **CI/CD:** GitHub Actions
* **Containerizare:** Docker & Docker Compose
* **Container Registry:** Docker Hub
* **Cloud Provider:** Amazon Web Services (AWS Lightsail)
* **OS Server:** Linux (Ubuntu)


## ⚙️ Infrastructure & Automated CI/CD Pipeline

Acest proiect foloseste practicile moderne de DevOps, folosind **GitHub Actions** pentru a automatiza complet fluxul de la cod la productie:

* **Continuous Integration (CI):** La fiecare push pe branch-ul `main`, pipeline-ul declanseaza automat build-ul aplicației de Spring Boot (Maven) și a celei de React (Vite).
* **Automated Docker Registry Push:** Imaginile sunt construite și urcate automat pe **Docker Hub**.
* **Continuous Deployment (CD) via SSH:** Pipeline-ul se conecteaza securizat (prin GitHub Secrets) la instanta **AWS Lightsail**, actualizeaza fisierul `docker-compose.yaml` și forteaza serverul sa faca *pull* noilor imagini, repornind containerele cu noile modificari.
* **Networking Izolat & Securizat:** Arhitectura de rețea privată de tip *bridge*, care izolează baza de date și backend-ul de accesul public.
* **High Availability & Auto-Healing:** Configurare de politici de restart (`always` / `on-failure`), asigurând repornirea automată a serviciilor în caz de erori critice sau restart al serverului.

---

## 🚀 Pornirea Rapidă (Quick Start)

Aveți nevoie de Docker instalat, dar nu este necesară instalarea locală a Java, Node.js sau MySQL. Proiectul este complet automatizat prin Docker.

### Deploy în Producție (Complet Automatizat)
In urma integrarii cu **GitHub Actions**, orice `git push` pe branch-ul `main` declanseaza automat:
1. Build-ul imaginilor.
2. Push către Docker Hub.
3. Conectarea SSH pe AWS Lightsail și rularea comenzilor de `docker compose pull && docker compose up -d`.
*Nu este necesară nicio intervenție manuală pe server!*


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
