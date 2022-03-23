INSERT INTO Users
VALUES
    (1, 'John', 'Doe', '+01 (541) 754-3010', 'john.doe@gallery.com', 'john', 'pbkdf2:sha256:150000$O5pmoLpl$0389f13a5cc2a72cae1bda162459eb872bdae6fd53b9658272d0d76ef116702f', '/images/default.jpg'),
	(2, 'Jane', 'Smith', '+34 678 387 155', 'jane.smith@gallery.com', 'jane', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default1.png'),
	(3, 'Pablo', 'R', '+34 387 155', 'pablo.r@gallery.com', 'pablo', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png'),
	(4, 'Pablo', 'Rivera', '123456789', 'pabrivjim@alum.us.es', 'pabrivjim', 'pbkdf2:sha256:150000$O5pmoLpl$0389f13a5cc2a72cae1bda162459eb872bdae6fd53b9658272d0d76ef116702f', '/images/default_profile.png'),
	(5, 'Pedro', 'J', '+34 123 155', 'pedro.j@gallery.com', 'pedro', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png'),
	(6, 'Juan', 'N', '+34 123 155', 'juan.n@gallery.com', 'juan', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png'),
	(7, 'Oscar', 'V', '+34 123 155', 'oscar.v@gallery.com', 'oscar', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/default_profile.png'),
	(8, 'mike', 'towers', '+34 123456789', 'mike.towers@gallery.com', 'towers', 'pbkdf2:sha256:150000$v4wgnaXC$b87f5daf437119c21ec712462f4b193b6fada27f485e36502c5cf4553a01f640', '/images/deafult.jpg'),
	(9, 'Pablo', 'PRJ', '1234678', 'pabrivjim2@alum.us.es', 'pabrivjim2', 'pbkdf2:sha256:150000$56039eN1$159874463de83b5f82bcc6ea3405c0fb71995a2b9967effb2ea62f328864ddfd', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv'),
	(10, 'Pablo', 'PRJ', '1234678', 'asdf', 'pabrivjimTest', 'pbkdf2:sha256:150000$fdnACXpR$b08d106d8a2e64f2e56c80ccfb3fa2c54d2bffc0b836e21d2fa7c51819b3c380', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv'),
	(11, 'Pablo', 'PRJ', '1234678', 'test2021@alum.us.es', 'test2021', 'pbkdf2:sha256:150000$ItW8ziMj$8df327c71dffd60df1f3905e49128e282ef24d5fe73a3c66ca27ddb0caa89dbc', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv'),
	(12, 'test06', 'test0602', '1234678', 'test0602@gmail.com', 'test0602', 'pbkdf2:sha256:150000$TvsJTiGl$90f25dec9b391015afadefb6c503a454b4590cb117e3ee74e12a7d417d059e75', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F_JUI265Jysc%2Fhqdefault.jpg&f=1&nofb=1'),
	(13, 'Conde Dracula', 'testissi2', '+01 (541) 754-3010', 'testissi2@alum.us.es', 'testissi2', 'pbkdf2:sha256:150000$w6iFrdtO$c861dc528785d3ffa72177415ebdfb7b6cac2a90bf6edef6f900dcf4dcc9fb11', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F_JUI265Jysc%2Fhqdefault.jpg&f=1&nofb=1');
-- Password = username

INSERT INTO Photos
VALUES
	(1, 'Tortilla', 'A typical Spanish tortilla. With onion, of course.', '2021-05-22 18:25:43', 'https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg', 'Public', 1),
	(2, 'Samoyed', 'A very fluffy dog', '2021-05-22 18:21:43', 'https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Samoyed-.jpg', 'Public', 2),
	(3, 'Coding in C#', 'A piece of very intricate code', '2021-05-22 18:20:43', 'https://pbs.twimg.com/media/Ea4HJNaXsAEbzzF?format=jpg&name=900x900', 'Public', 2),
	(4, 'The future society', 'This is how society would look like if PHP didn\'t exist', '2021-05-17 18:21:43', 'https://i.kym-cdn.com/entries/icons/facebook/000/026/738/future.jpg', 'Private', 2),
	(5, 'Comfy cat', 'A drawing of a cat about to sleep', '2016-04-23 18:21:43', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public', 1),
	(6, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-23 18:20:43', 'https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg', 'Public', 2),
	(7, 'Mont Saint-Michel', 'An island located in Normandy, France', '2021-05-19 18:20:43', 'https://www.timetravelturtle.com/wp-content/uploads/2019/11/Mont-St-Michel-2019-356_new.jpg', 'Public', 1),
	(8, 'Night operations', 'A plane flying over Toronto at night', '2020-02-28 13:33:37', 'https://www.airlive.net/wp-content/uploads/2016/09/maxresdefault-23.jpg', 'Private', 2),
	(9, 'Abstract art', 'A very weird clipart', '2015-05-01 12:23:11', 'https://clipartart.com/images/worst-clipart-ever-1.jpg', 'Private', 1),
	(10, 'Knitting', 'Very relaxing', '2019-01-12 21:30:00', 'https://cdn.shopify.com/s/files/1/0078/5065/5857/t/8/assets/62638885ceb5--CocoKnitsBook_Appendix_Photo5_2692.jpg?1338', 'Public', 2),
	(12, 'Panda Noruego', 'En verdad no es noruego pero busqué panda noruego y salió eso xd', '2021-05-22 01:10:17', 'https://www.zoomadrid.com/sites/default/files/blog/2010/12/panda-rojo1.jpg', 'Public', 1),
	(13, 'sonic', 'Sonic Rojo', '2021-05-25 16:12:33', 'https://pbs.twimg.com/media/D6uc2kBX4AAv3xV.jpg', 'public', 7),
	(14, 'javascript', 'JavaScript Logo', '2021-05-31 12:23:28', 'https://besthqwallpapers.com/Uploads/19-2-2020/122227/thumb2-javascript-glitter-logo-programming-language-grid-metal-background-javascript-creative.jpg', 'Public', 1),
	(15, 'astronauta', '', '2021-05-31 12:39:47', 'https://i.blogs.es/cfa482/illusion_1440x900/450_1000.jpg', 'Public', 1),
	(16, 'Wallpaper', 'Un precioso Cielo', '2021-05-31 14:44:54', 'https://i.pinimg.com/originals/6a/8b/50/6a8b50ac0aa0e64f224bcee2f0afbd66.jpg', 'Public', 1),
	(17, 'LastTest', '', '2021-05-31 14:48:47', 'https://images-na.ssl-images-amazon.com/images/I/816KBQDoAgL.png', 'Public', 1),
	(18, 'asfdasdf', 'asdfasdf', '2021-05-31 14:49:27', 'https://images-na.ssl-images-amazon.com/images/I/816KBQDoAgL.png', 'Public', 1),
	(19, 'Foto de montaña', 'asdfasdf', '2021-06-02 19:01:33', 'https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg', 'Public', 12),
	(20, 'Playa pixelada', '', '2021-06-02 19:02:48', 'https://www.nationalgeographic.com.es/medio/2018/02/27/playa-de-isuntza-lekeitio__1280x720.jpg', 'Public', 12),
	(21, 'Paisaje de montaña 2', '', '2021-06-02 19:07:54', 'https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg', 'Public', 1),
	(22, 'Playa Pixelada 2', '', '2021-06-02 19:15:41', 'https://www.nationalgeographic.com.es/medio/2018/02/27/playa-de-isuntza-lekeitio__1280x720.jpg', 'Private', 1),
	(23, 'Algo random', '', '2021-06-02 19:16:02', 'https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg', 'Public', 1),
	(24, 'Foto de la ETSII', 'ETSII', '2021-05-02 19:53:26', 'https://upload.wikimedia.org/wikipedia/commons/5/5b/ETSI_Inform%C3%A1tica_Sevilla_y_DrupalCamp_Spain_2011.jpg', 'Public', 9);

Insert into Comments
VALUES
	(1, 'que panda mas bonito', '2021-05-17 01:44:43', 12, 1),
	(2, 'holaaaa', '2019-05-22 01:32:43', 12, 1),
	(3, 'Bonito panda', '2021-05-15 01:30:39', 12, 2),
	(4, 'Pandaaa', '2021-05-16 01:30:39', 12, 3),
	(5, 'bonito perro\r\n', '2021-05-23 01:59:28', 2, 4),
	(6, 'RELINDO', '2021-05-23 02:01:22', 2, 4),
	(7, 'No alcanzo a ver el codigo\r\n', '2021-05-23 02:03:43', 3, 4),
	(8, 'Ufa buenardo\r\n', '2021-05-23 02:05:05', 7, 4),
	(9, 'la wena tortillota', '2021-05-23 02:05:55', 1, 4),
	(10, 'wow', '2021-05-23 21:27:43', 3, 1),
	(11, 'Bonito perro', '2021-05-23 22:46:03', 2, 1),
	(12, 'wow\r\n', '2021-05-24 15:02:59', 2, 1),
	(13, 'asdf', '2021-05-24 16:32:14', 5, 1),
	(14, 'wow\r\n', '2021-05-25 13:38:57', 3, 1),
	(15, 'Pedazo panda\r\n', '2021-05-25 13:42:50', 12, 1),
	(16, 'Lindo perro', '2021-05-26 00:27:07', 2, 4),
	(17, 'que guapaaa', '2021-06-01 20:13:36', 12, 4),
	(18, 'wow', '2021-06-01 20:14:42', 12, 4),
	(19, 'increíble', '2021-06-01 20:14:58', 23, 4),
	(20, 'increible cielo\r\n', '2021-06-01 20:19:19', 21, 4),
	(21, 'precioso paisaje\r\n', '2021-06-01 20:19:30', 22, 4),
	(22, 'asdf', '2021-06-02 15:13:37', 13, 1),
	(23, 'vaya guapada', '2021-06-02 19:16:58', 24, 4),
	(24, 'Muchas gracias', '2021-06-02 19:30:23', 24, 1);

INSERT INTO UsersUsers
VALUES
	(2, 5, 6),
	(3, 5, 7),
	(4, 6, 7),
	(5, 5, 1),
	(7, 5, 2),
	(8, 4, 3),
	(11, 1, 2),
	(13, 4, 7),
	(15, 4, 1),
	(18, 13, 7),
	(19, 6, 1),
	(20, 10, 1),
	(21, 12, 1);

Insert INTO inappropriatewords
VALUES
	(1, "puta"),
	(2, "puto"),
	(3, "bitch"),
	(4, "joder"),
	(5, "ostia"),
	(6, "estúpido"),
	(7, "estupido");

Insert INTO Categories 
VALUES
	(1, 'perros'),
	(2, 'animales'),
	(3, 'fotografia'),
	(4, 'comida'),
	(5, 'personas'),
	(6, 'random'),
	(7, 'js'),
	(8, 'programación'),
	(9, 'javascript'),
	(10, 'wallpaper'),
	(11, 'astronauta'),
	(12, 'asdf'),
	(13, 'asdfasdf'),
	(14, 'hola'),
	(15, 'test'),
	(16, 'selena gomez'),
	(17, 'famosa'),
	(18, 'paisaje'),
	(19, 'famosos');

Insert INTO Ratings
VALUES
	(1, '2021-04-15 00:00:00', 5, 3, 1),
	(2, '2021-04-14 00:00:00', 1, 2, 1),
	(3, '2021-05-23 00:20:09', 5, 2, 3),
	(4, '2021-05-23 00:21:48', 3, 2, 2),
	(5, '2021-05-23 01:13:56', 2, 1, 4),
	(6, '2021-05-23 01:14:11', 3, 3, 7),
	(7, '2021-05-23 20:15:18', 3, 1, 3),
	(8, '2021-05-23 22:46:30', 5, 1, 1),
	(9, '2021-05-23 23:27:41', 3, 1, 2),
	(10, '2021-05-23 23:57:54', 4, 1, 12),
	(11, '2021-05-23 23:59:39', 5, 1, 7),
	(12, '2021-05-24 16:35:41', 4, 1, 9),
	(13, '2021-05-25 13:50:41', 5, 1, 10),
	(14, '2021-05-26 01:34:30', 5, 4, 2),
	(15, '2021-05-26 01:35:56', 1, 4, 13),
	(16, '2021-05-26 09:14:00', 5, 8, 3),
	(17, '2021-06-02 01:35:56', 5, 2, 14),
	(18, '2021-06-01 01:35:56', 3, 4, 15),
	(19, '2021-06-01 02:35:56', 4, 5, 16),
	(20, '2021-06-02 04:35:56', 5, 10, 16),
	(21, '2021-06-02 01:38:26', 2, 11, 17),
	(22, '2021-06-02 01:38:26', 5, 11, 23);

INSERT INTO userscomments 
VALUES
	(1, 2, 11, -1),
	(2, 3, 11, 1),
	(3, 4, 2, 1),
	(4, 1, 7, 1),
	(6, 1, 5, 1),
	(7, 1, 12, 1),
	(8, 1, 11, -1),
	(9, 1, 10, -1),
	(22, 1, 6, -1),
	(30, 1, 13, 1),
	(34, 1, 1, 1),
	(35, 1, 4, 1),
	(36, 1, 3, 1);

INSERT INTO photoscategories 
VALUES
	(1, 1, 2),
	(2, 2, 2),
	(3, 2, 12),
	(4, 16, 18),
	(5, 10, 16),
	(6, 18, 16),
	(7, 10, 15);