package com.example.profesori_departamente.dto.request;

import com.example.profesori_departamente.entity.RolDepartament;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class CreateProfesorRequest {
	@NotBlank(message = "Numele este obligatoriu")
	private String nume;
	@NotBlank(message = "Prenumele este obligatoriu")
	private String prenume;
	@NotBlank(message = "Telefonul este obligatoriu")
	private String telefon;
	@Email(message = "Format email invalid")
	@NotBlank
	private String email;
	@NotEmpty(message = "Trebuie să selectați cel puțin un departament!")
	private Map<Integer,RolDepartament> departamente = new HashMap<>();
}
