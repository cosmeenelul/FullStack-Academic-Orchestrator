package com.example.profesori_departamente.service.impl;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.entity.*;
import com.example.profesori_departamente.mapper.ProfesorMapper;
import com.example.profesori_departamente.repository.ProfesorDepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorRepository;
import com.example.profesori_departamente.service.ProfesorDepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesorDepartamentServiceImpl implements ProfesorDepartamentService {
	private final ProfesorDepartamentRepository profesorDepartamentRepository;
	private final ProfesorRepository profesorRepository;
	private final ProfesorMapper profesorMapper;

	@Override
	@Transactional
	public ProfesorDTO changeDirector(Integer idDepartament, Integer idMembru) {
		Profesor profesorMembru = profesorRepository.findById(idMembru).orElseThrow(()->new RuntimeException("Nu exista acest profesor in baza de date"));

		ProfesorDepartament profesorDepartament = profesorDepartamentRepository
				.findById(new ProfesorDepartamentId(idDepartament,idMembru))
				.orElseThrow(() -> new RuntimeException("Profesorul nu face parte din acest departament!"));

		ProfesorDepartament vechiulDirector = profesorDepartamentRepository.findProfesorDepartamentByRolDepartamentAndDepartament_Id(RolDepartament.Director,idDepartament);

		if(vechiulDirector != null)
		{
			vechiulDirector.setRolDepartament(RolDepartament.Membru);
			profesorDepartamentRepository.save(vechiulDirector);
		}

		profesorDepartament.setProfesor(profesorMembru);
		profesorDepartamentRepository.save(profesorDepartament);
		return profesorMapper.toDTO(profesorMembru);
	}

	@Override
	public List<ProfesorDepartament> findProfesorDepartamentByDepartament_Id(Integer departamentId) {
		return profesorDepartamentRepository.findProfesorDepartamentByDepartament_Id(departamentId);
	}

	@Override
	public boolean existsByDepartmentRoleAndDepartmentId(RolDepartament rolDepartament, Integer departmentId) {
		return rolDepartament == RolDepartament.Director && profesorDepartamentRepository.existsByRolDepartamentAndDepartament_Id(RolDepartament.Director, departmentId);
	}


}
