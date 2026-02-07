package com.example.profesori_departamente.service.impl;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.dto.request.CreateProfesorRequest;
import com.example.profesori_departamente.dto.response.CreateProfesorResponse;
import com.example.profesori_departamente.entity.*;
import com.example.profesori_departamente.mapper.ProfesorMapper;
import com.example.profesori_departamente.repository.DepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorDepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorRepository;

import com.example.profesori_departamente.service.ProfesorDepartamentService;
import com.example.profesori_departamente.service.ProfesorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfesorServiceImpl implements ProfesorService {
	private final ProfesorRepository profesorRepository;
	private final ProfesorMapper profesorMapper;
	private final DepartamentRepository departamentRepository;
	private final ProfesorDepartamentRepository profesorDepartamentRepository;
	private final ProfesorDepartamentService profesorDepartamentService;

	@Override
	@Transactional(readOnly = true)
	public List<ProfesorDTO> findAll(){
		var profesori = profesorRepository.findAll();
		System.out.println(profesori);
		return profesorMapper.toDTOList(profesori);
	}

	@Override
	@Transactional
	public CreateProfesorResponse save(CreateProfesorRequest createProfesorRequest) {



		Profesor profesor = processProfesorCreation(createProfesorRequest.getNume(),
				createProfesorRequest.getPrenume(),
				createProfesorRequest.getTelefon(),
				createProfesorRequest.getEmail(),
				createProfesorRequest.getDepartamente());
		ProfesorDTO profesorDTO = profesorMapper.toDTO(profesor);
		return new CreateProfesorResponse(profesorDTO);
	}

	@Override
	@Transactional
	public CreateProfesorResponse updateById(Integer idProfesor,CreateProfesorRequest createProfesorRequest) {
		return processProfesorUpdate(idProfesor,
				createProfesorRequest.getNume(),
				createProfesorRequest.getPrenume(),
				createProfesorRequest.getTelefon(),
				createProfesorRequest.getEmail(),
				createProfesorRequest.getDepartamente());
	}

	@Override
	@Transactional
	public ProfesorDTO deleteById(Integer idProfesor) {
		ProfesorDTO profesorSters = profesorMapper.toDTO(profesorRepository.findById(idProfesor)
				.orElseThrow(()->new RuntimeException("Nu exista acest profesor in baza de date!")));
		profesorRepository.deleteById(idProfesor);
		return profesorSters;
	}

	@Override
	public List<ProfesorDTO> findAllProfesorByDepartamentId(Integer departamentId) {
		List<ProfesorDepartament> profesorDepartaments = profesorDepartamentRepository.findProfesorDepartamentByDepartament_Id(departamentId);
		List<Integer> profesoriIds = new ArrayList<>();

		for(ProfesorDepartament profesorDepartament : profesorDepartaments)
			profesoriIds.add(profesorDepartament.getProfesor().getId());

		List<Profesor> profesori = profesorRepository.findAllById(profesoriIds);

		return profesorMapper.toDTOList(profesori);
	}

	@Override
	public ProfesorDTO findById(Integer idProfesor) {
		return profesorMapper.toDTO(profesorRepository.findById(idProfesor).orElseThrow(()->new RuntimeException("Nu exista acest profesor in departament!")));
	}


	private void userAlreadyExists(String telefon){
		if(profesorRepository.existsByTelefon(telefon))
			throw new RuntimeException("User already exists!");
	}

	private Profesor processProfesorCreation(String nume, String prenume, String telefon, String email, Map<Integer, RolDepartament> departamente) {
		userAlreadyExists(telefon);

		departamente.forEach((cheie, val)->{
			if(val.equals(RolDepartament.Director))
				validateMemberDepartmentRole(cheie);
		});


		Profesor profesorSalvat = profesorRepository.save(Profesor.builder()
				.nume(nume)
				.prenume(prenume)
				.email(email)
				.telefon(telefon)
				.build());

		departamente.forEach((idDept, rolDept)-> {
			Departament departament = loadDepartament(idDept);

			ProfesorDepartamentId profesorDepartamentId = new ProfesorDepartamentId(profesorSalvat.getId(), idDept);

			ProfesorDepartament profesorDepartament = new ProfesorDepartament(
					profesorDepartamentId,
					profesorSalvat,
					departament,
					rolDept
			);

			profesorSalvat.getDepartamente().add(profesorDepartament);
		});

		return profesorSalvat;
	}

	private Departament loadDepartament(Integer idDepartament){
		return departamentRepository.findById(idDepartament).orElseThrow(()->new RuntimeException("Nu exista departamentul"));
	}

	private CreateProfesorResponse processProfesorUpdate(Integer idProfesor,String nume, String prenume, String telefon,
	                                                     String email, Map<Integer,RolDepartament> departamente){

		Profesor profesor = profesorRepository.findById(idProfesor).orElseThrow(()->new RuntimeException("Profesorul nu a fost gasit in baza de date!"));

		if(!profesor.getTelefon().equals(telefon))
			userAlreadyExists(telefon);


		departamente.forEach((cheie, val)->{
			if(val.equals(RolDepartament.Director))
				validateMemberDepartmentRole(cheie);
		});

		profesor.getDepartamente().removeIf(legatura ->
				!legatura.getRolDepartament().equals(RolDepartament.Director)
		);

		departamente.forEach((idDepartament, rolDepartament)->{

			Departament departament = loadDepartament(idDepartament);

			ProfesorDepartamentId profesorDepartamentId = new ProfesorDepartamentId(idDepartament,idProfesor);
			ProfesorDepartament profesorDepartament = new ProfesorDepartament(profesorDepartamentId,profesor,departament,rolDepartament);

			profesor.getDepartamente().add(profesorDepartament);
		});

		profesor.setNume(nume);
		profesor.setPrenume(prenume);
		profesor.setEmail(email);
		profesor.setTelefon(telefon);

		Profesor profesorSalvat = profesorRepository.save(profesor);
		ProfesorDTO profesorDTO = profesorMapper.toDTO(profesorSalvat);
		return new CreateProfesorResponse(profesorDTO);
	}

	private void validateMemberDepartmentRole(Integer departmentId){
		if(profesorDepartamentService.existsByDepartmentRoleAndDepartmentId(RolDepartament.Director,departmentId))
			throw new RuntimeException("Exista deja un Director in acest departament, folositi functia de Schimbare Director!");
	}

}
