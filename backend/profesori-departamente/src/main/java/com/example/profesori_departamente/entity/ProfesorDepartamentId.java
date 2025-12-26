package com.example.profesori_departamente.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProfesorDepartamentId implements Serializable {
	private Integer departamentId;
	private Integer profesorId;
}
