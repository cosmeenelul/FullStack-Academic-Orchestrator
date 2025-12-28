package com.example.profesori_departamente.service.impl;

import com.example.profesori_departamente.dto.DepartamentDTO;
import com.example.profesori_departamente.dto.request.CreateDepartamentRequest;
import com.example.profesori_departamente.entity.Departament;
import com.example.profesori_departamente.mapper.DepartamentMapper;
import com.example.profesori_departamente.repository.DepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorDepartamentRepository;
import com.example.profesori_departamente.repository.ProfesorRepository;
import com.example.profesori_departamente.service.DepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartamentSerciceImpl implements DepartamentService {

	private final DepartamentRepository departamentRepository;
	private final DepartamentMapper departamentMapper;
	private final ProfesorDepartamentRepository profesorDepartamentRepository;
	private final ProfesorRepository profesorRepository;

	public List<DepartamentDTO> findAll(){
		return departamentMapper.toDTOList(departamentRepository.findAll());
	}

	@Override
	@Transactional
	public DepartamentDTO save(CreateDepartamentRequest createDepartamentRequest) {
		verifyTelefon(createDepartamentRequest.getTelefon());

		Departament departamentSalvat = departamentRepository.save(Departament
				.builder()
				.linkWeb(createDepartamentRequest.getLinkWeb())
				.nume(createDepartamentRequest.getNume())
				.telefon(createDepartamentRequest.getTelefon())
				.build());
		return departamentMapper.toDTO(departamentSalvat);
	}

	@Override
	@Transactional
	public DepartamentDTO deleteById(Integer idDepartament) {
		Departament departament = departamentRepository.findById(idDepartament)
				.orElseThrow(() -> new RuntimeException("Nu exista acest departament"));
		DepartamentDTO departamentDTO = departamentMapper.toDTO(departament);

		List<Integer> idsProfesoriDeVerificat = profesorDepartamentRepository.findProfesorIdsByDepartamentId(idDepartament);

		departamentRepository.delete(departament);

		departamentRepository.flush();

		for (Integer idProf : idsProfesoriDeVerificat) {
			long count = profesorDepartamentRepository.countByProfesor_Id(idProf);

			if (count == 0) {
				profesorRepository.deleteById(idProf);
			}
		}

		return departamentDTO;
	}

	@Override
	public DepartamentDTO updateById(Integer id, CreateDepartamentRequest createDepartamentRequest) {
		Departament departament = departamentRepository.findById(id).orElseThrow(()->new RuntimeException("Acest departament nu exista!"));
		departament.setNume(createDepartamentRequest.getNume());
		departament.setTelefon(createDepartamentRequest.getTelefon());
		departament.setLinkWeb(createDepartamentRequest.getLinkWeb());

		if(!createDepartamentRequest.getTelefon().equals(departament.getTelefon()))
			verifyTelefon(createDepartamentRequest.getTelefon());

		departamentRepository.save(departament);

		return departamentMapper.toDTO(departament);
	}


	private void verifyTelefon(String telefon){
		if(departamentRepository.existsByTelefon(telefon))
			throw new RuntimeException("Numarul de telefon trebuie sa fie unic!");
	}
}
