package com.example.profesori_departamente.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tblprofesoridepartamente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
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
}
