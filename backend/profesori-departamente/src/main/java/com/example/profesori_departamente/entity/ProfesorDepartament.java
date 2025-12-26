package com.example.profesori_departamente.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name = "tblProfesoriDepartamente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ProfesorDepartament {
	@EmbeddedId
	private ProfesorDepartamentId id = new ProfesorDepartamentId();

	@MapsId("profesorId")
	@ManyToOne
	@JoinColumn(name = "profesor_id")
	private Profesor profesor;

	@MapsId("departamentId")
	@ManyToOne
	@JoinColumn(name = "departament_id")
	private Departament departament;

	@Column(name = "rol_in_departament")
	@Enumerated(EnumType.STRING)
	private RolDepartament rolDepartament;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof ProfesorDepartament that)) return false;

		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {

		return Objects.hashCode(id);
	}
}
