-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.
CREATE TABLE songs (
    id int NOT NULL PRIMARY KEY,
    bpm int NOT NULL,
    musical_key text NOT NULL,
    artist text NOT NULL,
    song_title text NOT NULL,
    notes varchar NOT NULL
);

<<<<<<< HEAD
INSERT INTO songs (id, bpm, musical_key, artist, song_title, notes)
VALUES (1, 90, 'C', 'Beethoven', 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
(2, 80, 'C', 'Mozart', 'Ah! Vous dirai-je, Maman', 'G4 G4 D5 D5 E5 E5 D5 0 C5 C5 B4 B4 A4 A4 G4'),
(3,120, 'F', 'Beethoven','Symphony No 5', 'A4 A4 A4 F4 0 0 0 G4 G4 G4 E4 0 0 0 0 A4 A4 A4 F4 Bb4 Bb4 Bb4 A4 F5 F5 F5 D5'),
(4, 140, 'Db', 'Laurent Gelmetti','Running in the 90s', 'E4 Eb4 0 0 E4 Eb4 0 0 E4 Eb4 D4 Db4 C4 Db4 D4 Eb4 E4 Eb4 0 0 E4 Eb4 0 0 E4 Eb4 D4 Db4 C4 Db4 D4 Eb4 0'),
(5, 100, 'G', 'Metallica', 'One', 'B3 Gb4 B3 D4 0 0 0 G3 Gb4 G3 D4 0 0 0 B3 Gb4 B3 D4 0 0 0 G3 Gb4 G3 D4 0 G4 0');
=======
INSERT INTO songs (id,artist,song_title, notes) 
VALUES (1,'Beethoven','Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');
INSERT INTO songs (id,artist,song_title, notes) 
VALUES (2,'Mozart','Ah! Vous dirai-je, Maman', 'G4 G4 D4 D4 E4 E4 D4 C4 C4 B4 B4 A4 A4 G4');
>>>>>>> parent of 8e92ebd (added more songs to db to test and implement new song sorting functionality)
