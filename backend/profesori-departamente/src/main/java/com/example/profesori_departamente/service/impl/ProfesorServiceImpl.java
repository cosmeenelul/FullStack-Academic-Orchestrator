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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
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
	@Transactional
	public CreateProfesorResponse save(CreateProfesorRequest createProfesorRequest) {

		Profesor profesor = processProfesorCreation(createProfesorRequest.getNume(),
				createProfesorRequest.getPrenume(),
				createProfesorRequest.getTelefon(),
				createProfesorRequest.getEmail(),
				createProfesorRequest.getIdDepartamente(),
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

	private Profesor processProfesorCreation(String nume, String prenume, String telefon, String email, List<Integer> idDepartamente, RolDepartament rolDepartament) {
		userAlreadyExists(telefon);

		Profesor profesorSalvat = profesorRepository.save(Profesor.builder()
				.nume(nume)
				.prenume(prenume)
				.email(email)
				.telefon(telefon)
				.build());

		for (Integer idDept : idDepartamente) {
			Departament departament = loadDepartament(idDept);

			ProfesorDepartamentId profesorDepartamentId = new ProfesorDepartamentId(profesorSalvat.getId(), idDept);

			ProfesorDepartament profesorDepartament = new ProfesorDepartament(
					profesorDepartamentId,
					profesorSalvat,
					departament,
					rolDepartament
			);

			profesorDepartamentRepository.save(profesorDepartament);
			profesorSalvat.getDepartamente().add(profesorDepartament);
		}

		return profesorSalvat;
	}

	private Departament loadDepartament(Integer idDepartament){
		return departamentRepository.findById(idDepartament).orElseThrow(()->new RuntimeException("Nu exista departamentul"));
	}
}
