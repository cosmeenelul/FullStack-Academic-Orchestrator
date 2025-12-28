package com.example.profesori_departamente.service.impl;

import com.example.profesori_departamente.dto.DepartamentDTO;
import com.example.profesori_departamente.dto.request.CreateDepartamentRequest;
import com.example.profesori_departamente.entity.Departament;
import com.example.profesori_departamente.mapper.DepartamentMapper;
import com.example.profesori_departamente.repository.DepartamentRepository;
import com.example.profesori_departamente.service.DepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartamentSerciceImpl implements DepartamentService {

	private final DepartamentRepository departamentRepository;
	private final DepartamentMapper departamentMapper;

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

	private void verifyTelefon(String telefon){
		if(departamentRepository.existsByTelefon(telefon))
			throw new RuntimeException("Numarul de telefon trebuie sa fie unic!");
	}
}
