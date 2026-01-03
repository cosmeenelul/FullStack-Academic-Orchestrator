package com.example.profesori_departamente.dto.request;

import com.example.profesori_departamente.entity.RolDepartament;
import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class CreateProfesorRequest {
	private String nume;
	private String prenume;
	private String telefon;
	private String email;
	private Map<Integer,RolDepartament> departamente = new HashMap<>();
}
