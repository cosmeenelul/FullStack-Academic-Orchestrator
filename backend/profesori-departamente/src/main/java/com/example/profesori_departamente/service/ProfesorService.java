package com.example.profesori_departamente.service;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.mapper.ProfesorMapper;
import com.example.profesori_departamente.repository.ProfesorRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesorService {
	private final ProfesorRepository profesorRepository;
	private final ProfesorMapper profesorMapper;

	@Transactional(readOnly = true)
	public List<ProfesorDTO> findAll(){
		var profesori = profesorRepository.findAll();
		System.out.println(profesori);
		return profesorMapper.toDTOList(profesori);
	}
}
