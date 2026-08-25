-- TXG · Ki-Khobor Help Desk — seed data (already applied to the `ki-khobor` project).
-- Run after schema.sql on a fresh project. Content is normally edited via /admin.

insert into public.settings (key, value) values
('site', '{"eventName":"TXG 2026","eventFullName":"Technology, Gaming & Innovation Expo","tagline":"Your digital guide to TXG 2026.","brand":"TXG · KI-KHOBOR","poweredBy":"Powered by Ki-Khobor","dates":"August 28–29, 2026","venueName":"NBCC Convention Hall","venueAddress":"Kohima, Nagaland","venueMapQuery":"NBCC Convention Hall Kohima Nagaland","registrationUrl":"https://www.txg-nagaland.com/","organizer":"Nagaland E-Sports Society"}'::jsonb)
on conflict (key) do update set value = excluded.value;

insert into public.events (title, category, description, prize, format, location, registration_url, icon, sort_order) values
('Inter-College Mobile Legends Championship','competition','The flagship 5v5 Mobile Legends: Bang Bang showdown between colleges across Nagaland.','₹1,00,000 prize pool','5v5 · Bracket','Tournament Arena','https://www.txg-nagaland.com/','Swords',1),
('Open MOBA 5v5 Tournament','competition','Open-registration 5v5 MOBA tournament for teams from across the state.','₹1,00,000 prize pool','5v5 · Bracket','Tournament Arena','https://www.txg-nagaland.com/','Gamepad2',2),
('Mini Tournaments Series','competition','Fast-format tournaments across EA Sports FC 26, Clash Royale, Tekken 8, Dirt Rally 2.0, Street Fighter 6 and Ludo King.','₹1,00,000 across titles','Multiple titles','Mini Tournament Stage','https://www.txg-nagaland.com/','Trophy',3),
('Cosplay Competition','activity','Show off your best cosplay on the performance stage and compete for prizes.','Prizes for top cosplayers','Performance stage','Main Stage','https://www.txg-nagaland.com/','Palette',4),
('Game Development Showcase','showcase','Local developers and studios showcase original games built in Nagaland.','—','Exhibition','Exhibition Hall','','Cpu',5),
('Career Discussion Panels','panel','Industry experts discuss careers in gaming, tech, esports and the creator economy.','—','Panel · Talks','Conference Room','','Mic',6),
('Tech Exhibition & Innovation Hub','showcase','Technology exhibitions, product showcases and interactive innovation displays.','—','Exhibition','Exhibition Hall','','Presentation',7),
('Interactive Gaming Demos','activity','Try the latest games and hardware at hands-on demo stations.','—','Open · Walk-in','Demo Zone','','Gamepad2',8);

insert into public.tournaments (name, game, format, status, prize, description, sort_order) values
('Mobile Legends Championship','Mobile Legends: Bang Bang','bracket','upcoming','₹1,00,000','Inter-college 5v5 championship.',1),
('Open MOBA 5v5','MOBA 5v5','bracket','upcoming','₹1,00,000','Open 5v5 MOBA tournament.',2),
('Tekken 8','Tekken 8','bracket','upcoming','Part of ₹1,00,000 mini series','1v1 fighting tournament.',3),
('Street Fighter 6','Street Fighter 6','bracket','upcoming','Part of ₹1,00,000 mini series','1v1 fighting tournament.',4),
('EA Sports FC 26','EA Sports FC 26','bracket','upcoming','Part of ₹1,00,000 mini series','1v1 football tournament.',5),
('Clash Royale','Clash Royale','bracket','upcoming','Part of ₹1,00,000 mini series','1v1 mobile tournament.',6),
('Dirt Rally 2.0','Dirt Rally 2.0','leaderboard','upcoming','Part of ₹1,00,000 mini series','Time-trial leaderboard.',7),
('Ludo King','Ludo King','leaderboard','upcoming','Part of ₹1,00,000 mini series','Casual leaderboard tournament.',8);

-- Schedule, standings, faqs, contacts, venue_locations and drivers are also seeded
-- in the live project. See the admin panel (/admin) to view or edit all content.
