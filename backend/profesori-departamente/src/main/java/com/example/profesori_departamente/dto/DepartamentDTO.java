package com.example.profesori_departamente.dto;

import com.example.profesori_departamente.mapper.ProfesorMapper;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Data
@Getter
@Setter
public class DepartamentDTO {
	private Integer id;
	private String nume;
	private String telefon;
	private String linkWeb;
	private Set<ProfesorDepartamentDTO> profesori;
}
