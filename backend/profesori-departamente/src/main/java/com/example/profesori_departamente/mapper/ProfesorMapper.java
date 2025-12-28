package com.example.profesori_departamente.mapper;

import com.example.profesori_departamente.dto.ProfesorDTO;
import com.example.profesori_departamente.entity.Profesor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProfesorDepartamentMapper.class})
public interface ProfesorMapper {

	@Mapping(source = "id", target = "id")
	ProfesorDTO toDTO(Profesor profesor);

	List<ProfesorDTO> toDTOList(List<Profesor> profesori);
}
