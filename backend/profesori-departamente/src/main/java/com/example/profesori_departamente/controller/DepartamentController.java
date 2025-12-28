package com.example.profesori_departamente.controller;

import com.example.profesori_departamente.dto.DepartamentDTO;
import com.example.profesori_departamente.dto.request.CreateDepartamentRequest;
import com.example.profesori_departamente.service.DepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

	@PostMapping()
	public DepartamentDTO save(@RequestBody CreateDepartamentRequest createDepartamentRequest){
		return departamentService.save(createDepartamentRequest);
	}

	@DeleteMapping("/{idDepartment}")
	public DepartamentDTO deleteById(@PathVariable Integer idDepartment){
		return departamentService.deleteById(idDepartment);
	}
}
