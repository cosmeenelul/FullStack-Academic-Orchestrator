package com.example.profesori_departamente.dto.response;

import com.example.profesori_departamente.dto.ProfesorDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProfesorResponse {
	private ProfesorDTO profesorDTO;
}
