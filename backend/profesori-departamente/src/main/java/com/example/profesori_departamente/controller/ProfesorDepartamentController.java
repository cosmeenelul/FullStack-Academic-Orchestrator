package com.example.profesori_departamente.controller;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.dto.request.ChangeDirectorRequest;
import com.example.profesori_departamente.service.ProfesorDepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profesor-departament")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfesorDepartamentController {
	private final ProfesorDepartamentService profesorDepartamentService;

	@PutMapping("/{idDepartament}")
	public ProfesorDTO changeDirector(@PathVariable Integer idDepartament, @RequestBody ChangeDirectorRequest changeDirectorRequest){
		return profesorDepartamentService.changeDirector(idDepartament,changeDirectorRequest.getIdMembru());
	}
}
