package com.example.profesori_departamente.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name="tblDepartamente")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Departament extends CommonEntity{
	@Column(name="nume")
	private String nume;

	@Column(name="telefon")
	private String telefon;

	@Column(name = "linkWeb")
	private String linkWeb;


}
