package com.example.profesori_departamente.dto;

import com.example.profesori_departamente.entity.RolDepartament;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class ProfesorDTO {
	private String nume;
	private String prenume;
	private String email;
	private String telefon;
	private RolDepartament rol;
	private List<DepartamentDTO> departamentDTOS;
}
