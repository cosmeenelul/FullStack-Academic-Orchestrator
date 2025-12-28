package com.example.profesori_departamente.repository;

import com.example.profesori_departamente.entity.Departament;
import com.example.profesori_departamente.entity.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor,Integer> {
	boolean existsByTelefon(String telefon);
}
