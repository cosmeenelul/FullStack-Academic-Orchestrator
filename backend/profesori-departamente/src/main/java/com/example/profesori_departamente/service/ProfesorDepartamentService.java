package com.example.profesori_departamente.service;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.entity.ProfesorDepartament;
import com.example.profesori_departamente.entity.RolDepartament;

import java.util.List;

public interface ProfesorDepartamentService {
	ProfesorDTO changeDirector(Integer idDepartament, Integer idMembru);
	List<ProfesorDepartament> findProfesorDepartamentByDepartament_Id(Integer departamentId);
	boolean existsByDepartmentRoleAndDepartmentId(RolDepartament rolDepartament, Integer departmentId);
}
