INSERT INTO channel (defaultStreamUrl, id, isRunning, name, usersOnline) VALUES (null, '12345', 0, null, 1);
INSERT INTO user (displayName, id, name, realName) VALUES ('Maciek', 'U9SNE3S31', 'mikon0096', 'Maciej Sikorski');
INSERT INTO track (createdAt, duration, id, skips, title, addedById) VALUES ('2019-05-21 08:58:28', 210, '_4VCpTZye10', 0, 'Three Days Grace - Break (Official Music Video)', 'U9SNE3S31');
INSERT INTO track (createdAt, duration, id, skips, title, addedById) VALUES ('2019-10-01 20:46:16', 175, '_D1rrdFcj1U', 0, 'Matoma & Enrique Iglesias – I Don''t Dance (Without You) [feat. Konshens] [Official Lyric Video]', 'U9SNE3S31');
INSERT INTO queued_track (createdAt, id, `order`, playedAt, randomized, addedById, trackId, playedInId) VALUES ('2019-05-19 20:56:59', 2, 0, null, 0, 'U9SNE3S31', '_4VCpTZye10', '12345');
INSERT INTO queued_track (createdAt, id, `order`, playedAt, randomized, addedById, trackId, playedInId) VALUES ('2019-05-19 21:02:36', 4, 0, null, 0, 'U9SNE3S31', '_D1rrdFcj1U', '12345');
