package com.example.profesori_departamente.service.impl;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.dto.request.CreateProfesorRequest;
import com.example.profesori_departamente.dto.response.CreateProfesorResponse;
import com.example.profesori_departamente.entity.*;
import com.example.profesori_departamente.mapper.ProfesorMapper;
import com.example.profesori_departamente.repository.DepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorDepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorRepository;

import com.example.profesori_departamente.service.ProfesorService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Builder
public class ProfesorServiceImpl implements ProfesorService {
	private final ProfesorRepository profesorRepository;
	private final ProfesorMapper profesorMapper;
	private final DepartamentRepository departamentRepository;
	private final ProfesorDepartamentRepository profesorDepartamentRepository;

	@Override
	@Transactional(readOnly = true)
	public List<ProfesorDTO> findAll(){
		var profesori = profesorRepository.findAll();
		System.out.println(profesori);
		return profesorMapper.toDTOList(profesori);
	}

	@Override
	public ProfesorDTO findById() {
		return null;
	}

	@Override
	public CreateProfesorResponse save(CreateProfesorRequest createProfesorRequest) {
		Profesor profesor = processProfesorCreation(createProfesorRequest.getNume(),
				createProfesorRequest.getPrenume(),
				createProfesorRequest.getTelefon(),
				createProfesorRequest.getEmail(),
				createProfesorRequest.getIdDepartament(),
				createProfesorRequest.getRolDepartament());
		ProfesorDTO profesorDTO = profesorMapper.toDTO(profesor);
		return new CreateProfesorResponse(profesorDTO);
	}

	@Override
	public ProfesorDTO updateById() {
		return null;
	}

	@Override
	public ProfesorDTO deleteById() {
		return null;
	}

	private void userAlreadyExists(String telefon){
		if(profesorRepository.existsByTelefon(telefon))
			throw new RuntimeException("User already exists!");
	}

	private Profesor processProfesorCreation(String nume, String prenume, String telefon, String email, Integer idDepartament, RolDepartament rolDepartament){
		userAlreadyExists(telefon);

		Profesor profesor = new Profesor(nume,prenume,email,telefon);
		Profesor profesorSalvat = profesorRepository.save(profesor);

		Departament departament = loadDepartament(idDepartament);

		Set<ProfesorDepartament> profesorDepartamentSet = new HashSet<>();
		ProfesorDepartamentId profesorDepartamentId = new ProfesorDepartamentId(idDepartament,profesorSalvat.getId());
		ProfesorDepartament profesorDepartament = new ProfesorDepartament(profesorDepartamentId,profesor,departament,rolDepartament);

		profesorDepartamentRepository.save(profesorDepartament);

		return profesorRepository.findById(profesorSalvat.getId()).orElseThrow(()->new RuntimeException("A aparut o eroarea la afisarea datelor salvate!"));
	}

	private Departament loadDepartament(Integer idDepartament){
		return departamentRepository.findById(idDepartament).orElseThrow(()->new RuntimeException("Nu exista departamentul"));
	}
}
