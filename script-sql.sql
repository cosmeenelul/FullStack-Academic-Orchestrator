USE profesoriDepartamenteDB;

CREATE TABLE tblDepartamente(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(100) NOT NULL,
    telefon VARCHAR(10) NOT NULL,
    linkWeb VARCHAR(200) NOT NULL
);

CREATE TABLE tblProfesori(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(100) NOT NULL,
    prenume VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	telefon VARCHAR(10)
);

CREATE TABLE tblProfesoriDepartamente(
	departament_id INT NOT NULL,
    profesor_id INT NOT NULL,
    rol_in_departament ENUM("Membru","Director"),
	PRIMARY KEY (departament_id, profesor_id),
    FOREIGN KEY (departament_id) REFERENCES tblDepartamente(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES tblProfesori(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 1. Inserturi in tblDepartamente
INSERT INTO tblDepartamente (nume, telefon, linkWeb) VALUES 
('Dispozitive, circuite și arhitecturi electronice', '0214024824', 'http://dcae.pub.ro'),
('Electronică aplicată și ingineria informației', '0214024838', 'http://eaii.pub.ro'),
('Tehnologie Electronică şi Fiabilitate', '0214024671', 'http://tef.pub.ro'),
('Telecomunicații', '0214024769', 'http://telecom.pub.ro');


INSERT INTO tblProfesori (nume, prenume, email, telefon) VALUES 
('DAN', 'Claudius', 'claudius.dan@upb.ro', '0214024824'),
('FLOREA', 'Bogdan', 'bogdan.florea@upb.ro', '0214024838'),
('VLĂDESCU', 'Marian', 'marian.vladescu@upb.ro', '0214024671'),
('OBREJA', 'Șerban-Georgică', 'serban.obreja@upb.ro', '0214024769'),
('Ionescu', 'Andrei', 'andrei.ionescu@upb.ro', '0721000111'),
('Popescu', 'Elena', 'elena.popescu@upb.ro', '0721000222'),
('Dumitru', 'Cristian', 'cristian.dumitru@upb.ro', '0721000333'),
('Marin', 'Anca', 'anca.marin@upb.ro', '0721000444'),
('Stoica', 'George', 'george.stoica@upb.ro', '0721000555'),
('Radu', 'Mihaela', 'mihaela.radu@upb.ro', '0721000666');


INSERT INTO tblProfesoriDepartamente (departament_id, profesor_id, rol_in_departament) VALUES 
(1, 1, 'Director'),
(2, 2, 'Director'),
(3, 3, 'Director'),
(4, 4, 'Director'),

(1, 5, 'Membru'),
(1, 6, 'Membru'),
(2, 7, 'Membru'),
(3, 8, 'Membru'),
(4, 9, 'Membru'),
(4, 10, 'Membru'),

(2, 5, 'Membru');