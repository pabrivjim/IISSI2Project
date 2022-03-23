-- Fotos recientes (RF-C01)

CREATE OR REPLACE VIEW PhotosWithUsers AS
    SELECT P.*, U.username, U.avatarUrl
    FROM Photos P NATURAL JOIN Users U; 

--  Ver fotos (RF-C02)

CREATE OR REPLACE VIEW PhotosWithRatings AS
    Select P.*, (Select Sum(R.value)/COUNT(*) from 
    Ratings R, Photos P WHERE R.userId = P.userId) from Photos P;

