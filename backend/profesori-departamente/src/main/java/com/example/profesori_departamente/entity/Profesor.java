package com.example.profesori_departamente.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="tblProfesori")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Profesor extends CommonEntity{

	@Column(name="nume")
	private String nume;

	@Column(name="prenume")
	private String prenume;

	@Column(name = "email")
	private String email;

	@Column(name= "telefon")
	private String telefon;
}
