package com.example.profesori_departamente.controller;

import com.example.profesori_departamente.dto.DepartamentDTO;
import com.example.profesori_departamente.service.DepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/departamente")
@RequiredArgsConstructor
public class DepartamentController {
	private final DepartamentService departamentService;

	@GetMapping
	public List<DepartamentDTO> findAlL(){
		return departamentService.findAll();
	}
}
