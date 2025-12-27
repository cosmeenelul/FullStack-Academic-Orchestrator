package com.example.profesori_departamente.service;

import com.example.profesori_departamente.dto.ProfesorDTO;

public interface ProfesorDepartamentService {
	ProfesorDTO changeDirector(Integer idDepartament, Integer idMembru);
}
