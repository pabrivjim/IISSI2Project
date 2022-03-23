
-- Limitación en el número de fotos (RN-C01)

DELIMITER //
CREATE OR REPLACE TRIGGER tLimitPhoto AFTER
INSERT ON photos FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM photos P WHERE P.userId = NEW.UserId);
	IF (total > 50) then SIGNAL SQLSTATE '45000'
	SET message_text = 'Un usuario no puede subir mas de 50 fotos';
END IF;
END //
DELIMITER ;

-- Lenguaje inapropiado en título y descripción (RN-C02)
DELIMITER //
CREATE OR REPLACE TRIGGER tBadWordsInTittleOrDescription_Update BEFORE
Update ON photos FOR EACH ROW BEGIN
	DECLARE counter INT;
	SET counter = (SELECT COUNT(*) FROM inappropriatewords IA, photos P WHERE new.title LIKE CONCAT("%", IA.word, "%") or new.description LIKE CONCAT("%", IA.word, "%") AND P.photoId = NEW.photoId);
	IF (counter > 0) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes usar palabras inapropiadas en el título o en la descripción';
END IF;
END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER tBadWordsInTittleOrDescription After
INSERT ON photos FOR EACH ROW BEGIN
	DECLARE counter INT;
	SET counter = (SELECT COUNT(*) FROM inappropriatewords IA, photos P WHERE new.title LIKE CONCAT("%", IA.word, "%") or new.description LIKE CONCAT("%", IA.word, "%") AND P.photoId = NEW.photoId);
	IF (counter > 0) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes usar palabras inapropiadas en el título o en la descripción';
END IF;
END //
DELIMITER ;

-- Unicidad de cuentas (RN-C03)

DELIMITER //
CREATE OR REPLACE TRIGGER tSameAccount BEFORE
INSERT ON users FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM users U WHERE U.email = NEW.email OR U.username = NEW.username AND U.userId != NEW.userId);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'Dos usuarios distintos no pueden tener el mismo nombre de usuario ni el mismo E-mail';
END IF;
END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER tSameAccount_Update BEFORE
UPDATE ON users FOR EACH ROW BEGIN
	DECLARE total INT;
	DECLARE total1 INT;
	SET total = (SELECT COUNT(*) FROM users U WHERE ((U.email = NEW.email) AND (U.userId != NEW.userId)));
	SET total1 = (SELECT COUNT(*) FROM users U WHERE ((U.username = NEW.username) AND (U.userId != NEW.userId)));
	IF (total >=1 OR total1 >=1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'Dos usuarios distintos no pueden tener el mismo nombre de usuario ni el mismo E-mail';
END IF;
END //
DELIMITER ;


-- Limitación de valoraciones (RN-C04)

DELIMITER //
CREATE OR REPLACE TRIGGER tDoubleRating BEFORE
INSERT ON ratings FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM ratings R WHERE R.photoId = NEW.photoId AND R.userId = NEW.userId);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes valorar una foto más de una vez';
END IF;
END //
DELIMITER ;



DELIMITER //
CREATE OR REPLACE TRIGGER tDoubleRating_Update BEFORE
UPDATE ON ratings FOR EACH ROW BEGIN
		DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM ratings R WHERE R.photoId = NEW.photoId AND R.userId = NEW.userId);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes valorar una foto más de una vez';
END IF;
END //
DELIMITER ;



-- RN-B05: Eliminación de fotos


DELIMITER //
CREATE OR REPLACE TRIGGER tDeletePhotoWithComment BEFORE
Delete ON photos FOR EACH ROW BEGIN
	DECLARE res INT;
	SET res = (SELECT COUNT(*) FROM comments C WHERE C.photoId = OLD.photoId);
	IF (res >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes borrar fotos con comentarios';
END IF;
END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER tPrivatePhotoWithComment BEFORE
Update ON photos FOR EACH ROW BEGIN
	DECLARE res INT;
	SET res = (SELECT COUNT(*) FROM comments C WHERE C.photoId = new.photoId);
	IF (new.visibility = 'Private' and res >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes privatizar fotos con comentarios';
END IF;
END //
DELIMITER ;


-- Unicidad de categorías (RN-B06)


DELIMITER //
CREATE OR REPLACE TRIGGER tDoubleCategory BEFORE
INSERT ON categories FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM categories C WHERE C.name = NEW.name);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes crear una categoría ya existente';
END IF;
END //
DELIMITER ;


-- Uso de lenguaje adecuado en los comentarios (RN-B07)
-- En comentarios
DELIMITER //
CREATE OR REPLACE TRIGGER tBadWordsInComment_Update BEFORE
Update ON comments FOR EACH ROW BEGIN
	DECLARE counter INT;
	SET counter = (SELECT COUNT(*) FROM inappropriatewords IA, comments C WHERE new.text LIKE CONCAT("%", IA.word, "%") AND C.commentId = NEW.commentId);
	IF (counter > 0) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes usar palabras inapropiadas en comentarios';
END IF;
END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER tBadWordsInComment after
INSERT ON comments FOR EACH ROW BEGIN
	DECLARE counter INT;
	SET counter = (SELECT COUNT(*) FROM inappropriatewords IA, comments C WHERE new.text LIKE CONCAT("%", IA.word, "%") AND C.commentId = NEW.commentId);
	IF (counter > 0) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes usar palabras inapropiadas en comentarios';
END IF;
END //
DELIMITER ;




-- Comentarios en fotos privadas


DELIMITER //
CREATE OR REPLACE TRIGGER tPrivatePhotoComment BEFORE
INSERT ON comments FOR EACH ROW BEGIN
	DECLARE res VARCHAR(20);
	SET res = (SELECT visibility FROM photos P WHERE P.photoId = NEW.photoId);
	IF (res = "Private") then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes comentar en una foto Privada';
END IF;
END //
DELIMITER ;

-- Teoricamente Esta no haría falta, pero por si acaso a algun iluminado se le ocurre tocar en la base de datos o se decide
-- Agregar nuevas funcionalidades en un futuro => punto de variabilidad y extensión


DELIMITER //
CREATE OR REPLACE TRIGGER tPrivatePhotoComment_Update BEFORE
UPDATE ON comments FOR EACH ROW BEGIN
	DECLARE res VARCHAR(20);
	SET res = (SELECT visibility FROM photos P WHERE P.photoId = NEW.photoId);
	IF (res = "Private") then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes comentar en una foto Privada';
END IF;
END //
DELIMITER ;

-- En mi caso como he añadido valoraciones a los comentarios, un comentario no puede ser valorado dos veces por la misma persona

DELIMITER //
CREATE OR REPLACE TRIGGER tDuplicateValoration BEFORE
INSERT ON userscomments FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM userscomments UC WHERE UC.userId = NEW.userId AND UC.commentId = NEW.commentId);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes valorar un comentario dos veces';
END IF;
END //
DELIMITER ;


-- No puede haber repetido el mismo par de categoryId y PhotoId

DELIMITER //
CREATE OR REPLACE TRIGGER tDoublePhotoCategories BEFORE
Insert ON photoscategories FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM photoscategories PC WHERE PC.categoryId = NEW.categoryId AND PC.photoId = NEW.photoId);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes asignar una categoría a una foto varias veces';
END IF;
END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER tDoublePhotoCategoriesUpdate BEFORE
Update ON photoscategories FOR EACH ROW BEGIN
	DECLARE total INT;
	SET total = (SELECT COUNT(*) FROM photoscategories PC WHERE PC.categoryId = NEW.categoryId AND PC.photoId = NEW.photoId);
	IF (total >= 1) then SIGNAL SQLSTATE '45000'
	SET message_text = 'No puedes asignar una categoría a una foto varias veces';
END IF;
END //
DELIMITER ;