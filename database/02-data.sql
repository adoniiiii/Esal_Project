--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.regions (id, name) FROM stdin;
1	Son-Kul
2	Issyk-Kul
3	Ala-Archa
4	Chunkurchak
5	Jeti-Oguz
6	Karakol
7	Naryn
8	Tash Rabat
9	Sary-Chelek
10	Kochkor
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.places (id, name, description, type, region_id, location_text, latitude, longitude, capacity, price, includes_meal, includes_horses, has_playground, contact_phone, contact_person, photo_url, is_active) FROM stdin;
1	Nomad's Dream Yurt	Authentic yurt on the southern shore of Son-Kul. Herders family will welcome you with warm tea. Sleep on traditional felt mats.	yurt	1	South shore of Son-Kul lake, near Kochkor	\N	\N	6	45.00	t	t	f	+996 700 111 222	\N	https://yurta.kg/wp-content/uploads/2023/04/yurta-voylochnaya-6metrov-obychnaya-min.jpg	t
2	Eagle Valley Yurt Camp	Remote location with stunning mountain views. Horses available for day trips. Dinner included.	yurt	2	Eagle Valley, 10km from Issyk-Kul south shore	\N	\N	8	60.00	t	t	f	+996 700 333 444	\N	https://www.stanradar.com/upload/news/thumb/1537853769_49301200.png	t
3	Celestial Mountains Yurt	Located at 3,000m altitude. See stars like nowhere else. Simple but cozy.	yurt	1	Northern Son-Kul plateau	\N	\N	5	50.00	t	f	f	+996 700 555 666	\N	https://yurta.kg/wp-content/uploads/2023/04/yurty-dlya-conferenciy-kyrgyzstane-kupit-min.jpg	t
4	Karakol Yurt Lodge	Wooden floor yurt near Karakol city. Hot water and modern toilet shared.	yurt	6	3km east of Karakol	\N	\N	4	55.00	t	t	f	+996 700 777 888	\N	https://ic.pics.livejournal.com/lyaksandra_vrn/82791732/108920/108920_900.jpg	t
5	Jeti-Oguz Red Rocks Yurt	Famous red rock canyon view. Family-run yurt with homemade jam and bread.	yurt	5	Jeti-Oguz canyon entrance	\N	\N	7	48.00	t	t	f	+996 700 999 000	\N	https://www.stanradar.com/upload/news/thumb/1537853769_49301200.png	t
6	Tash Rabat Caravanserai Yurt	Near the ancient stone caravanserai. History meets nomadic life.	yurt	8	2km from Tash Rabat	\N	\N	6	52.00	t	f	f	+996 701 111 222	\N	https://www.stanradar.com/upload/news/thumb/1537853769_49301200.png	t
7	Sary-Chelek Lake Yurt	Walnut forest and crystal lake. Peaceful retreat.	yurt	9	Sary-Chelek reserve entrance	\N	\N	5	58.00	t	t	f	+996 701 333 444	\N	https://yurta.kg/wp-content/uploads/2023/04/yurty-dlya-conferenciy-kyrgyzstane-kupit-min.jpg	t
8	Kochkor Valley Yurt	Cooperative of local women. They teach felt making. Breakfast included.	yurt	10	Kochkor village outskirts	\N	\N	8	42.00	t	f	f	+996 701 555 666	\N	https://ic.pics.livejournal.com/lyaksandra_vrn/82791732/108920/108920_900.jpg	t
9	Barskoon Waterfall Yurt	Near the famous waterfall. Cold mountain stream for refreshing.	yurt	2	Barskoon gorge, 15km from main road	\N	\N	6	47.00	t	t	f	+996 701 777 888	\N	https://yurta.kg/wp-content/uploads/2023/04/yurta-voylochnaya-6metrov-obychnaya-min.jpg	t
10	Altyn Arashan Yurt	Hot springs nearby. Most remote yurt in the list.	yurt	6	Altyn Arashan valley, 4 hour hike	\N	\N	4	65.00	t	f	f	+996 701 999 000	\N	https://yurta.kg/wp-content/uploads/2023/04/yurty-dlya-conferenciy-kyrgyzstane-kupit-min.jpg	t
11	Song-Kul South Coast Yurt	Less crowded side of the lake. More authentic.	yurt	1	South coast Son-Kul	\N	\N	7	44.00	t	t	f	+996 702 111 222	\N	https://www.stanradar.com/upload/news/thumb/1537853769_49301200.png	t
12	Chon-Kemin Yurt Camp	Green valley near Bishkek. Easy access from capital.	yurt	4	Chon-Kemin national park	\N	\N	9	40.00	t	t	f	+996 702 333 444	\N	https://ic.pics.livejournal.com/lyaksandra_vrn/82791732/108920/108920_900.jpg	t
13	Kilemchi Jailoo Yurt	High pasture only accessible in summer. Pure nomad life.	yurt	7	Kilemchi valley, Naryn region	\N	\N	5	70.00	t	t	f	+996 702 555 666	\N	https://yurta.kg/wp-content/uploads/2023/04/yurta-voylochnaya-6metrov-obychnaya-min.jpg	t
14	Grigorievka Gorge Yurt	Forest meets mountains. Mushroom picking nearby.	yurt	2	Grigorievka gorge north shore	\N	\N	6	46.00	t	f	f	+996 702 777 888	\N	https://ic.pics.livejournal.com/lyaksandra_vrn/82791732/108920/108920_900.jpg	t
15	Kyzyl-Oi Yurt	Colorful village canyon. Very friendly host family.	yurt	7	Kyzyl-Oi village, 5km from main road	\N	\N	5	38.00	t	t	f	+996 702 999 000	\N	https://www.stanradar.com/upload/news/thumb/1537853769_49301200.png	t
16	Ala-Archa Forest Topchan	Shaded platform in pine forest. Grill and firepit available. Perfect for 8-10 people.	topchan	3	Ala-Archa park, near main trailhead	\N	\N	12	25.00	f	f	t	+996 703 111 222	\N	https://i.pinimg.com/564x/55/be/e4/55bee4fcd7b0de5ff7622750810ebb43.jpg	t
17	Son-Kul Lakeside Topchan	Unbelievable lake view. Come with your own food. We provide cushions and canopy.	topchan	1	Son-Kul east shore	\N	\N	20	35.00	f	f	f	+996 703 333 444	\N	https://i.pinimg.com/564x/55/be/e4/55bee4fcd7b0de5ff7622750810ebb43.jpg	t
18	Chunkurchak Valley Topchan	Close to Bishkek. Playground for kids. Dishes provided.	topchan	4	Chunkurchak valley, 30 min from Bishkek	\N	\N	15	30.00	f	f	t	+996 703 555 666	\N	thttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqEMHYDTliTTD8IqD96FOjVyaRyvE3YngWA&s	t
19	Issyk-Kul Beach Topchan	On the beach! Walk into water. Chef available for extra fee.	topchan	2	Cholpon-Ata beach area	\N	\N	10	40.00	t	f	t	+996 703 777 888	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJz6zoi16fz2HMyaNBYgPSncnKVWLkSuSBA&s	t
20	Jeti-Oguz Canyon Topchan	Red rock views. Grill ready. Bring your own meat.	topchan	5	Jeti-Oguz canyon, near broken heart rock	\N	\N	14	28.00	f	f	f	+996 703 999 000	\N	https://i.pinimg.com/564x/55/be/e4/55bee4fcd7b0de5ff7622750810ebb43.jpg	t
21	Karakol Apple Garden Topchan	Shaded orchard setting. Dishwasher available. Perfect for large family.	topchan	6	Karakol outskirts, apple orchard	\N	\N	18	32.00	f	f	t	+996 704 111 222	\N	https://i.pinimg.com/564x/55/be/e4/55bee4fcd7b0de5ff7622750810ebb43.jpg	t
22	Naryn River Topchan	Right next to river. Sound of water. Firepit included.	topchan	7	Naryn city, 2km south	\N	\N	10	22.00	f	f	f	+996 704 333 444	\N	https://i.pinimg.com/564x/55/be/e4/55bee4fcd7b0de5ff7622750810ebb43.jpg	t
23	Tash Rabat Mountain Topchan	High altitude picnic spot. Bring warm clothes even in summer.	topchan	8	Near Tash Rabat caravanserai	\N	\N	12	30.00	f	f	f	+996 704 555 666	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqEMHYDTliTTD8IqD96FOjVyaRyvE3YngWA&s	t
24	Sary-Chelek Forest Topchan	Inside walnut forest. Mushrooms abundant in autumn.	topchan	9	Sary-Chelek lake trail start	\N	\N	10	26.00	f	f	f	+996 704 777 888	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSza3luffWdDrTSqUgMwLtFw5tvW6T_WeUBuA&s	t
25	Kochkor Felt Workshop Topchan	Combine lunch with felt making workshop. Dishes provided.	topchan	10	Kochkor village center	\N	\N	8	35.00	t	f	f	+996 704 999 000	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJz6zoi16fz2HMyaNBYgPSncnKVWLkSuSBA&s	t
26	Boom Gorge Topchan	Rock climbers favorite. After climbing, relax here.	topchan	4	Boom gorge, near climbing wall	\N	\N	12	20.00	f	f	f	+996 705 111 222	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqEMHYDTliTTD8IqD96FOjVyaRyvE3YngWA&s	t
27	Tamga Hot Springs Topchan	Combine with hot springs visit. Chef available.	topchan	2	Tamga village, near hot springs	\N	\N	16	38.00	t	f	t	+996 705 333 444	\N	https://i.pinimg.com/564x/55/be/e4/55bee4fcd7b0de5ff7622750810ebb43.jpg	t
28	Karkyra Valley Topchan	Off the beaten path. Very quiet. Only sound is cows.	topchan	6	Karkyra valley, 20km from Karakol	\N	\N	10	24.00	f	f	f	+996 705 555 666	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSza3luffWdDrTSqUgMwLtFw5tvW6T_WeUBuA&s	t
29	Suusamyr Jailoo Topchan	Wide open valley. Windy but beautiful. Canopy provided.	topchan	10	Suusamyr valley main road	\N	\N	25	28.00	f	f	t	+996 705 777 888	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqEMHYDTliTTD8IqD96FOjVyaRyvE3YngWA&s	t
30	Bishkek City Topchan	Within city! Rooftop topchan. Urban escape.	topchan	3	Bishkek, southern district	\N	\N	8	18.00	f	f	f	+996 705 999 000	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJz6zoi16fz2HMyaNBYgPSncnKVWLkSuSBA&s	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, full_name, phone, created_at) FROM stdin;
1	nazarovagulaiym45@gmail.com	$2b$10$w6OAoybLvxnBxbkL7cZ4iOLgfQRB0RJuwRxK5lJ.Hzm8OKgmfNgYu	Nazarova Gulaiym	\N	2026-05-20 16:42:06.869498
2	qwerty@gmail.com	12345678	qwerty	996704919571	2026-05-20 17:27:09.259271
3	test@example.com	$2b$10$Ua5xlbLx4cHXtV8fzElQneaRR6FH2TEdtd.cEIlh0CPgD2QwFlSOW	Test User	\N	2026-05-20 18:20:33.932619
4	test2@example.com	$2b$10$q.ZORbbVVOoiSJihlgPK..jDmBgf/335jj0VotIgVYUIMNaBYiQJu	Test User 2 	\N	2026-05-20 18:24:10.850202
5	asdfg@gmail.com	$2b$10$QWDoWY35a6M/8r1VJS0Iv.2yHcV5iALr3JnDPSrxHIq4Bx68h.Xe6	asdfg 	\N	2026-05-20 22:55:07.530707
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, user_id, place_id, date_from, date_to, guests_count, total_price, status, booking_date) FROM stdin;
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- Name: places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.places_id_seq', 30, true);


--
-- Name: regions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.regions_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

