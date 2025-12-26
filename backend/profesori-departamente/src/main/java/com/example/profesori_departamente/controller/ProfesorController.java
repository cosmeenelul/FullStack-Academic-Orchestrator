package com.example.profesori_departamente.controller;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.service.ProfesorService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/profesori")
@RequiredArgsConstructor
public class ProfesorController {
	private final ProfesorService profesorService;

	@GetMapping()
	public List<ProfesorDTO> findAll(){
		return profesorService.findAll();
	}
}
