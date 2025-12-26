package com.example.profesori_departamente.dto;

import com.example.profesori_departamente.entity.RolDepartament;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ProfesorDepartamentDTO {
	private DepartamentDTO departament;
	private ProfesorDTO profesor;
	private RolDepartament rolDepartament;
}
