package com.example.profesori_departamente.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name="tblDepartamente")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
public class Departament extends CommonEntity{
	@Column(name="nume")
	private String nume;

	@Column(name="telefon")
	private String telefon;

	@Column(name = "linkWeb")
	private String linkWeb;

	@OneToMany(mappedBy = "departament", orphanRemoval = true, cascade = CascadeType.ALL)
	private Set<ProfesorDepartament> profesori = new HashSet<>();


}
