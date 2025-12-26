package com.example.profesori_departamente.repository;

import com.example.profesori_departamente.entity.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorDepartamentRepository extends JpaRepository<Profesor,Integer> {
}
