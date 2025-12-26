package com.example.profesori_departamente.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class DepartamentDTO {
	private String nume;
	private String telefon;
	private String linkWeb;
	private List<ProfesorDTO> profesorDTOS;
}
