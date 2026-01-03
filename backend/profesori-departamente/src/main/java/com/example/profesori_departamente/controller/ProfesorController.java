package com.example.profesori_departamente.controller;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.dto.request.CreateProfesorRequest;
import com.example.profesori_departamente.dto.response.CreateProfesorResponse;
import com.example.profesori_departamente.service.impl.ProfesorServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/profesori")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfesorController {
	private final ProfesorServiceImpl profesorService;

	@GetMapping()
	public List<ProfesorDTO> findAll(){
		return profesorService.findAll();
	}

	@GetMapping("/departamente")
	public List<ProfesorDTO> findAllByDepartamentId(@RequestParam("departamentId") Integer departamentId){
		return profesorService.findAllProfesorByDepartamentId(departamentId);
	}

	@PostMapping()
	public CreateProfesorResponse save(@RequestBody CreateProfesorRequest createProfesorRequest){
		return profesorService.save(createProfesorRequest);
	}

	@PutMapping("/{id}")
	public CreateProfesorResponse updateById(@RequestBody CreateProfesorRequest createProfesorRequest, @PathVariable Integer id){
		return profesorService.updateById(id,createProfesorRequest);
	}

	@GetMapping("/profil/{idProfesor}")
	public ProfesorDTO findById(@PathVariable Integer idProfesor){
		return profesorService.findById(idProfesor);
	}

	@DeleteMapping("/{id}")
	public ProfesorDTO deleteById(@PathVariable Integer id){
		return profesorService.deleteById(id);
	}
}
