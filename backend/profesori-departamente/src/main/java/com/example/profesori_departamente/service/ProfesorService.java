package com.example.profesori_departamente.service;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.dto.request.CreateProfesorRequest;
import com.example.profesori_departamente.dto.response.CreateProfesorResponse;

import java.util.List;

public interface ProfesorService {
	List<ProfesorDTO> findAll();
	ProfesorDTO findById();
	CreateProfesorResponse save(CreateProfesorRequest createProfesorRequest);
	ProfesorDTO updateById();
	ProfesorDTO deleteById();
}
