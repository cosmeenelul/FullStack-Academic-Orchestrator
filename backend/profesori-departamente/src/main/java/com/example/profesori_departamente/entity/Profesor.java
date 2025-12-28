package com.example.profesori_departamente.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="tblProfesori")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
public class Profesor extends CommonEntity{

	@Column(name="nume")
	private String nume;

	@Column(name="prenume")
	private String prenume;

	@Column(name = "email")
	private String email;

	@Column(name= "telefon")
	private String telefon;

	@OneToMany(mappedBy = "profesor",cascade = CascadeType.ALL,orphanRemoval = true)
	@Builder.Default
	@JsonBackReference
	@JsonIgnore
	private Set<ProfesorDepartament> departamente = new HashSet<>();

}
