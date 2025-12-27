package com.example.profesori_departamente.service;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.dto.request.CreateProfesorRequest;
import com.example.profesori_departamente.dto.response.CreateProfesorResponse;

import java.util.List;

public interface ProfesorService {
	List<ProfesorDTO> findAll();
	CreateProfesorResponse save(CreateProfesorRequest createProfesorRequest);
	CreateProfesorResponse updateById(Integer idProfesor, CreateProfesorRequest createProfesorRequest);
	ProfesorDTO deleteById(Integer idProfesor);

}
