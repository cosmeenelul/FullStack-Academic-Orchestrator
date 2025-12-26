package com.example.profesori_departamente.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProfesorDepartamentId implements Serializable {
	private Integer departamentId;
	private Integer profesorId;

}
