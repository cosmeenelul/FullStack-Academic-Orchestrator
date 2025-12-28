package com.example.profesori_departamente.mapper;

import com.example.profesori_departamente.dto.DepartamentDTO;
import com.example.profesori_departamente.entity.Departament;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartamentMapper {


	@Mapping(target = "profesori", ignore = true)
	@Mapping(target = "id", source = "id")
	DepartamentDTO toDTO(Departament departament);

	List<DepartamentDTO> toDTOList(List<Departament> departament);
}
