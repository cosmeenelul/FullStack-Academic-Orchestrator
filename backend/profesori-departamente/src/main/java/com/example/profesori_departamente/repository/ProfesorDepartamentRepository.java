package com.example.profesori_departamente.repository;

import com.example.profesori_departamente.entity.Profesor;
import com.example.profesori_departamente.entity.ProfesorDepartament;
import com.example.profesori_departamente.entity.ProfesorDepartamentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorDepartamentRepository extends JpaRepository<ProfesorDepartament, ProfesorDepartamentId> {
}
