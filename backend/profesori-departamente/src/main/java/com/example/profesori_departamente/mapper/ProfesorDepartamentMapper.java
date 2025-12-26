package com.example.profesori_departamente.mapper;

import com.example.profesori_departamente.dto.ProfesorDepartamentDTO;
import com.example.profesori_departamente.entity.ProfesorDepartament;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {DepartamentMapper.class})
public interface ProfesorDepartamentMapper {

	@Mapping(target = "profesor", ignore = true)
	ProfesorDepartamentDTO toDTO(ProfesorDepartament profesorDepartament);

	List<ProfesorDepartamentDTO> toDTOList(List<ProfesorDepartament> list);
}
