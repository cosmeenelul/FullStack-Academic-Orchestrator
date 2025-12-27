package com.example.profesori_departamente.repository;

import com.example.profesori_departamente.entity.Profesor;
import com.example.profesori_departamente.entity.ProfesorDepartament;
import com.example.profesori_departamente.entity.ProfesorDepartamentId;
import com.example.profesori_departamente.entity.RolDepartament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorDepartamentRepository extends JpaRepository<ProfesorDepartament, ProfesorDepartamentId> {
	ProfesorDepartament findProfesorDepartamentByRolDepartamentAndDepartament_Id(RolDepartament rolDepartament,Integer idDepartament);
}
