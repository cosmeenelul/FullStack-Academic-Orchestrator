package com.example.profesori_departamente.repository;

import com.example.profesori_departamente.entity.Profesor;
import com.example.profesori_departamente.entity.ProfesorDepartament;
import com.example.profesori_departamente.entity.ProfesorDepartamentId;
import com.example.profesori_departamente.entity.RolDepartament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfesorDepartamentRepository extends JpaRepository<ProfesorDepartament, ProfesorDepartamentId> {
	ProfesorDepartament findProfesorDepartamentByRolDepartamentAndDepartament_Id(RolDepartament rolDepartament,Integer idDepartament);
	List<ProfesorDepartament> findProfesorDepartamentByDepartament_Id(Integer departamentId);
	boolean existsByRolDepartament(RolDepartament rolDepartament);
}
