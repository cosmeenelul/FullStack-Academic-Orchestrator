package com.example.profesori_departamente.dto.request;

import com.example.profesori_departamente.entity.RolDepartament;
import lombok.Data;

import java.util.List;

@Data
public class CreateProfesorRequest {
	private String nume;
	private String prenume;
	private String telefon;
	private String email;
	private List<Integer> idDepartamente;
	private RolDepartament rolDepartament;
}
