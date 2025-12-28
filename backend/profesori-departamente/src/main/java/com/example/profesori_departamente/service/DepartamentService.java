package com.example.profesori_departamente.service;

import com.example.profesori_departamente.dto.DepartamentDTO;
import com.example.profesori_departamente.dto.request.CreateDepartamentRequest;

import java.util.List;

public interface DepartamentService {
	List<DepartamentDTO> findAll();
	DepartamentDTO save(CreateDepartamentRequest createDepartamentRequest);
}
