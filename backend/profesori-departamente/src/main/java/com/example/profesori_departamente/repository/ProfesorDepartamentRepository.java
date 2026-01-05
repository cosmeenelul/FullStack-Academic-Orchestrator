package com.example.profesori_departamente.repository;

import com.example.profesori_departamente.entity.Profesor;
import com.example.profesori_departamente.entity.ProfesorDepartament;
import com.example.profesori_departamente.entity.ProfesorDepartamentId;
import com.example.profesori_departamente.entity.RolDepartament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfesorDepartamentRepository extends JpaRepository<ProfesorDepartament, ProfesorDepartamentId> {
	ProfesorDepartament findProfesorDepartamentByRolDepartamentAndDepartament_Id(RolDepartament rolDepartament,Integer idDepartament);
	List<ProfesorDepartament> findProfesorDepartamentByDepartament_Id(Integer departamentId);
	boolean existsByRolDepartamentAndDepartament_Id(RolDepartament rolDepartament, Integer departamentId);
	long countByProfesor_Id(Integer idProfesor);

	@Query("SELECT pd.profesor.id FROM ProfesorDepartament pd WHERE pd.departament.id = :idDept")
	List<Integer> findProfesorIdsByDepartamentId(@Param("idDept") Integer idDept);

}
