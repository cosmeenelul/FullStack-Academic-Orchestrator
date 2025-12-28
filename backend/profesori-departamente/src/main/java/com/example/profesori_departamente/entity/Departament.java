package com.example.profesori_departamente.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.HashSet;
import java.util.Objects;
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

	@OneToMany(mappedBy = "departament")
	private Set<ProfesorDepartament> profesori = new HashSet<>();


}
