import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // PocketBase server URL
const ADMIN_EMAIL = "me@tunahan.at"; // Replace with your admin email
const ADMIN_PASSWORD = "Tunahan59!"; // Replace with your admin password

const duasData = [
  {
    "arabicText": "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
    "englishTranslation": "O my Lord, indeed I have wronged myself, so forgive me.",
    "turkishTranslation": "Rabbim, gerçekten kendime zulmettim, beni bağışla.",
    "germanTranslation": "O mein Herr, ich habe mir selbst Unrecht getan, so vergib mir.",
    "transliteration": "Rabbee innee zalamtu nafsee faghfir lee",
    "source": "Quran 28:16",
    "category": "Repentance"
  },
  {
    "arabicText": "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    "englishTranslation": "I seek forgiveness from Allah and repent to Him.",
    "turkishTranslation": "Allah'tan bağışlanma diliyor ve O'na tövbe ediyorum.",
    "germanTranslation": "Ich bitte Allah um Vergebung und bereue vor Ihm.",
    "transliteration": "Astaghfirullah wa atoobu ilayh",
    "source": "Hadith (Bukhari, Muslim)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الغَفُورُ الرَّحِيمُ",
    "englishTranslation": "O Allah, I have wronged myself greatly, and none forgives sins except You. So grant me forgiveness from You and have mercy on me. Indeed, You are the Oft-Forgiving, Most Merciful.",
    "turkishTranslation": "Allah'ım, kendime çok zulmettim, günahları ancak Sen bağışlarsın. Bana katından bir mağfiret ver ve bana merhamet et. Şüphesiz Sen, çok bağışlayansın, çok merhametlisin.",
    "germanTranslation": "O Allah, ich habe mir selbst großes Unrecht getan, und niemand vergibt die Sünden außer Dir. So gewähre mir Vergebung von Dir und habe Erbarmen mit mir. Wahrlich, Du bist der Allvergebende, der Barmherzige.",
    "transliteration": "Allahumma innee zalamtu nafsee thulman katheera, wa la yaghfirudh-dhunuba illa anta, faghfirlee maghfiratan min 'indika, warhamnee, innaka antal-Ghafoorur-Raheem",
    "source": "Hadith (Bukhari, Muslim)",
    "category": "Repentance"
  },
  {
    "arabicText": "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    "englishTranslation": "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    "turkishTranslation": "Rabbimiz, biz kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen, mutlaka hüsrana uğrayanlardan oluruz.",
    "germanTranslation": "Unser Herr, wir haben uns selbst Unrecht getan, und wenn Du uns nicht vergibst und uns nicht barmherzig bist, werden wir gewiss unter den Verlierern sein.",
    "transliteration": "Rabbana thalamna anfusana wa-in lam taghfir lana watarhamna lanakoonanna mina alkhasireen",
    "source": "Quran 7:23",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي، وَإِسْرَافِي فِي أَمْرِي، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي، اللَّهُمَّ اغْفِرْ لِي جِدِّي وَهَزْلِي، وَخَطَئِي وَعَمْدِي، وَكُلُّ ذَلِكَ عِنْدِي",
    "englishTranslation": "O Allah, forgive my mistakes, my ignorance, my excesses in my affairs, and what You know better than me. O Allah, forgive my seriousness and my jest, my errors and my intentional sins, for all of that is from me.",
    "turkishTranslation": "Allah'ım, hatalarımı, cehaletimi, işlerimdeki aşırılıklarımı ve Senin benden daha iyi bildiklerini bağışla. Allah'ım, ciddi halimi, şakalarımı, hatalarımı ve kasıtlı günahlarımı bağışla, çünkü bunların hepsi benden kaynaklanmıştır.",
    "germanTranslation": "O Allah, vergib mir meine Fehler, meine Unwissenheit, mein Übermaß in meinen Angelegenheiten und das, was Du besser weißt als ich. O Allah, vergib mir mein Ernst und meinen Scherz, meine Versehen und meine vorsätzlichen Sünden, denn all das ist von mir.",
    "transliteration": "Allahumma-ghfir lee khatee'atee wa jahlee, wa israafee fee amree, wa ma anta a'lamu bihi minnee. Allahumma-ghfir lee jiddi wa hazlee, wa khata'ee wa 'amdee, wa kullu thalika 'indee",
    "source": "Hadith (Bukhari)",
    "category": "Repentance"
  },
  {
    "arabicText": "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    "englishTranslation": "Glory be to You, O Allah, and praise be to You. I bear witness that there is no deity but You. I seek Your forgiveness and repent to You.",
    "turkishTranslation": "Seni eksikliklerden tenzih ederim Allah'ım ve Sana hamd ederim. Şahitlik ederim ki Senden başka ilah yoktur. Senden bağışlanma diliyor ve Sana tövbe ediyorum.",
    "germanTranslation": "Preis sei Dir, O Allah, und Lob sei Dir. Ich bezeuge, dass es keinen Gott gibt außer Dir. Ich bitte Dich um Vergebung und bereue vor Dir.",
    "transliteration": "Subhanaka Allahumma wa bihamdika, ash-hadu an la ilaha illa anta, astaghfiruka wa atoobu ilayk",
    "source": "Hadith (Tirmidhi)",
    "category": "Repentance"
  },
  {
    "arabicText": "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
    "englishTranslation": "My Lord, forgive me and accept my repentance, for You are the Accepter of Repentance, the Most Merciful.",
    "turkishTranslation": "Rabbim, beni bağışla ve tövbemi kabul et. Şüphesiz Sen, tövbeleri kabul edensin, çok merhametlisin.",
    "germanTranslation": "Mein Herr, vergib mir und nimm meine Reue an, denn Du bist der Reue-Annehmende, der Barmherzige.",
    "transliteration": "Rabbighfir lee watub 'alayya innaka antat-Tawwabur-Raheem",
    "source": "Quran 17:25",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ لاَ إِلَهَ إِلاَّ أَنْتَ، وَحْدَكَ لاَ شَرِيكَ لَكَ، الْمَنَّانُ، يَا بَدِيعَ السَّمَاوَاتِ وَالأَرْضِ، يَا ذَا الْجَلالِ وَالإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ، إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
    "englishTranslation": "O Allah, I ask You by the fact that all praise is Yours, there is no deity but You alone, with no partner, the Bestower of Favors, O Originator of the heavens and the earth, O Possessor of Majesty and Honor, O Ever-Living, O Sustainer, I have wronged myself, so forgive me.",
    "turkishTranslation": "Allah'ım, Sana hamdın yalnızca Sana ait olduğu, Senden başka ilah olmadığı, ortağın bulunmadığı, nimetler veren, ey göklerin ve yerin yaratıcısı, ey Celal ve İkram sahibi, ey Hayy ve Kayyum olan Allah'ım, kendime zulmettim, beni bağışla.",
    "germanTranslation": "O Allah, ich bitte Dich dadurch, dass aller Lobpreis Dir gehört, es gibt keinen Gott außer Dir allein, ohne Partner, der Wohltäter, O Schöpfer der Himmel und der Erde, O Besitzer der Majestät und der Ehre, O Ewiglebende, O Erhalter, ich habe mir selbst Unrecht getan, so vergib mir.",
    "transliteration": "Allahumma inni as'aluka bi-anna lakal-hamd, la ilaha illa anta, wahdaka la shareeka lak, al-Mannan, ya Badi'as-samawati wal-ard, ya Dhal-Jalali wal-Ikram, ya Hayyu ya Qayyum, inni zalamtu nafsee faghfir lee",
    "source": "Hadith (Abu Dawud, Tirmidhi)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    "englishTranslation": "O Allah, I seek refuge in You from grief and sorrow, from weakness and laziness, from cowardice and miserliness, and from being overpowered by debt and the oppression of men.",
    "turkishTranslation": "Allah'ım, kederden ve hüzünden, acizlikten ve tembellikten, korkaklıktan ve cimrilikten, borç altında ezilmekten ve insanların baskısından Sana sığınırım.",
    "germanTranslation": "O Allah, ich suche Zuflucht bei Dir vor Kummer und Traurigkeit, vor Schwäche und Faulheit, vor Feigheit und Geiz, und davor, von Schulden überwältigt zu werden und vor der Unterdrückung durch Menschen.",
    "transliteration": "Allahumma inni a'oodhu bika minal-hammi wal-hazan, wa a'oodhu bika minal-'ajzi wal-kasal, wa a'oodhu bika minal-jubni wal-bukhl, wa a'oodhu bika min ghalabatid-dayn wa qahrir-rijal",
    "source": "Hadith (Bukhari)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ طَهِّرْنِي مِنَ الذُّنُوبِ وَالْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ",
    "englishTranslation": "O Allah, purify me from sins and mistakes as a white garment is purified from filth.",
    "turkishTranslation": "Allah'ım, beyaz elbisenin kirden temizlendiği gibi beni günahlardan ve hatalardan temizle.",
    "germanTranslation": "O Allah, reinige mich von Sünden und Fehlern, wie ein weißes Gewand von Schmutz gereinigt wird.",
    "transliteration": "Allahumma tahhirnee minadh-dhunubi wal-khataaya kama yunaqqath-thawbul-abyadu minad-danas",
    "source": "Hadith (Ibn Majah)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَسْأَلُكَ التَّوْبَةَ وَالْمُعَافَاةَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
    "englishTranslation": "O Allah, I ask You for repentance, well-being, and safety in this world and the Hereafter.",
    "turkishTranslation": "Allah'ım, Senden tövbe, afiyet ve dünya ile ahirette sağlık diliyorum.",
    "germanTranslation": "O Allah, ich bitte Dich um Reue, Wohlergehen und Sicherheit in dieser Welt und im Jenseits.",
    "transliteration": "Allahumma inni as'alukat-tawbata wal-mu'aafata wal-'aafiyata fid-dunya wal-akhirah",
    "source": "Hadith (Ibn Majah)",
    "category": "Repentance"
  },
  {
    "arabicText": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    "englishTranslation": "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    "turkishTranslation": "Rabbimiz, bize dünyada iyilik ver, ahirette de iyilik ver ve bizi ateşin azabından koru.",
    "germanTranslation": "Unser Herr, gib uns Gutes in dieser Welt und Gutes im Jenseits, und bewahre uns vor der Strafe des Feuers.",
    "transliteration": "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    "source": "Quran 2:201",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
    "englishTranslation": "O Allah, You are my Lord, there is no deity but You. You created me, and I am Your servant. I abide by Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I confess my sins. So forgive me, for none forgives sins except You.",
    "turkishTranslation": "Allah'ım, Sen benim Rabbimsin, Senden başka ilah yoktur. Beni Sen yarattın ve ben Senin kulunum. Gücüm yettiğince Senin ahdine ve vaadine bağlıyım. Yaptıklarımın kötülüğünden Sana sığınırım. Bana olan nimetini itiraf ediyor, günahlarımı da kabul ediyorum. Beni bağışla, çünkü günahları ancak Sen bağışlarsın.",
    "germanTranslation": "O Allah, Du bist mein Herr, es gibt keinen Gott außer Dir. Du hast mich erschaffen, und ich bin Dein Diener. Ich halte mich an Deinen Bund und Dein Versprechen, so gut ich kann. Ich suche Zuflucht bei Dir vor dem Bösen dessen, was ich getan habe. Ich gestehe Deine Gunst mir gegenüber und bekenne meine Sünden. So vergib mir, denn niemand vergibt die Sünden außer Dir.",
    "transliteration": "Allahumma anta Rabbi, la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'oodhu bika min sharri ma sana'tu, aboo'u laka bini'matika 'alayya, wa aboo'u bidhanbee, faghfir lee fa innahu la yaghfirudh-dhunuba illa anta",
    "source": "Hadith (Bukhari)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
    "englishTranslation": "O Allah, I ask You for all that is good, in this world and the next, what I know of it and what I do not know. And I seek refuge in You from all that is evil, in this world and the next, what I know of it and what I do not know.",
    "turkishTranslation": "Allah'ım, Senden her türlü hayrı isterim; dünya ve ahirette, bildiğim ve bilmediğim bütün iyilikleri. Ve her türlü şerden Sana sığınırım; dünya ve ahirette, bildiğim ve bilmediğim bütün kötülüklerden.",
    "germanTranslation": "O Allah, ich bitte Dich um alles Gute, in dieser Welt und im Jenseits, was ich davon weiß und was ich nicht weiß. Und ich suche Zuflucht bei Dir vor allem Bösen, in dieser Welt und im Jenseits, was ich davon weiß und was ich nicht weiß.",
    "transliteration": "Allahumma inni as'aluka minal-khayri kullihi 'ajilihi wa ajilihi ma 'alimtu minhu wa ma lam a'lam, wa a'oodhu bika minash-sharri kullihi 'ajilihi wa ajilihi ma 'alimtu minhu wa ma lam a'lam",
    "source": "Hadith (Ibn Majah)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    "englishTranslation": "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
    "turkishTranslation": "Allah'ım, Senden hidayet, takva, iffet ve zenginlik (gönül zenginliği) diliyorum.",
    "germanTranslation": "O Allah, ich bitte Dich um Rechtleitung, Gottesfurcht, Keuschheit und Unabhängigkeit.",
    "transliteration": "Allahumma inni as'alukal-huda wat-tuqa wal-'afaaf wal-ghina",
    "source": "Hadith (Muslim)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ أَصْلِحْ لِي دِينِيَ الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ",
    "englishTranslation": "O Allah, rectify my religion, which is the safeguard of my affairs. Rectify my worldly life, in which is my livelihood. Rectify my Hereafter, in which is my return. Make life an increase for me in every good, and make death a relief for me from every evil.",
    "turkishTranslation": "Allah'ım, işlerimin koruyucusu olan dinimi düzelt. Geçim kaynağım olan dünyamı düzelt. Dönüş yerim olan ahiretimi düzelt. Hayatı her hayırda artış vesilesi kıl, ölümü de her şerden kurtuluş vesilesi eyle.",
    "germanTranslation": "O Allah, verbessere meine Religion, die der Schutz meiner Angelegenheiten ist. Verbessere mein weltliches Leben, in dem mein Lebensunterhalt liegt. Verbessere mein Jenseits, in das ich zurückkehren werde. Mache das Leben für mich zu einer Zunahme an allem Guten, und mache den Tod für mich zu einer Erleichterung von allem Bösen.",
    "transliteration": "Allahumma aslih lee deeniyal-ladhi huwa 'ismatu amree, wa aslih lee dunyaya-l-lati feeha ma'ashee, wa aslih lee akhirati-l-lati feeha ma'aadee, waj'alil-hayata ziyadatan lee fee kulli khayr, waj'alil-mawta raahatan lee min kulli sharr",
    "source": "Hadith (Muslim)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيعِ سَخَطِكَ",
    "englishTranslation": "O Allah, I seek refuge in You from the removal of Your blessings, the change in Your protection, the suddenness of Your punishment, and all forms of Your displeasure.",
    "turkishTranslation": "Allah'ım, nimetlerinin yok olmasından, afiyetinin değişmesinden, cezanın ansızın gelmesinden ve bütün gazabından Sana sığınırım.",
    "germanTranslation": "O Allah, ich suche Zuflucht bei Dir davor, dass Deine Gaben verschwinden, Dein Schutz sich ändert, Deine Strafe plötzlich kommt und vor allem, was Deinen Zorn erregt.",
    "transliteration": "Allahumma inni a'oodhu bika min zawali ni'matik, wa tahawwuli 'afiyatik, wa fuja'ati niqmatik, wa jamee'i sakhatik",
    "source": "Hadith (Muslim)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ، وَالْهَرَمِ، وَالْمَأْثَمِ، وَالْمَغْرَمِ",
    "englishTranslation": "O Allah, I seek refuge in You from laziness, old age, sinfulness, and debt.",
    "turkishTranslation": "Allah'ım, tembellikten, yaşlılıktan, günahtan ve borçtan Sana sığınırım.",
    "germanTranslation": "O Allah, ich suche Zuflucht bei Dir vor Faulheit, Altersschwäche, Sündhaftigkeit und Schulden.",
    "transliteration": "Allahumma inni a'oodhu bika minal-kasal, wal-haram, wal-ma'tham, wal-maghram",
    "source": "Hadith (Bukhari)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لاَ يَنْفَعُ، وَمِنْ قَلْبٍ لاَ يَخْشَعُ، وَمِنْ نَفْسٍ لاَ تَشْبَعُ، وَمِنْ دَعْوَةٍ لاَ يُسْتَجَابُ لَهَا",
    "englishTranslation": "O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that does not fear, from a soul that is never satisfied, and from a supplication that is not answered.",
    "turkishTranslation": "Allah'ım, faydasız ilimden, huşu duymayan kalpten, doymayan nefisten ve kabul olunmayan duadan Sana sığınırım.",
    "germanTranslation": "O Allah, ich suche Zuflucht bei Dir vor nutzlosem Wissen, einem Herzen ohne Ehrfurcht, einer unersättlichen Seele und einem Gebet, das nicht erhört wird.",
    "transliteration": "Allahumma inni a'oodhu bika min 'ilmin la yanfa', wa min qalbin la yakhsha', wa min nafsin la tashba', wa min da'watin la yustajabu laha",
    "source": "Hadith (Muslim)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَسْأَلُكَ فِعْلَ الْخَيْرَاتِ، وَتَرْكَ الْمُنْكَرَاتِ، وَحُبَّ الْمَسَاكِينِ، وَأَنْ تَغْفِرَ لِي وَتَرْحَمَنِي، وَإِذَا أَرَدْتَ فِتْنَةَ قَوْمٍ فَتَوَفَّنِي غَيْرَ مَفْتُونٍ",
    "englishTranslation": "O Allah, I ask You to enable me to do good deeds, abandon evil deeds, love the poor, and that You forgive me and have mercy on me. And when You will a trial for a people, take me without being afflicted.",
    "turkishTranslation": "Allah'ım, Senden hayırlı işler yapmayı, kötülükleri terk etmeyi, fakirleri sevmeyi, beni bağışlamanı ve bana merhamet etmeni istiyorum. Bir kavme fitne vermek istediğinde, beni fitneye uğramadan vefat ettir.",
    "germanTranslation": "O Allah, ich bitte Dich darum, gute Taten zu vollbringen, schlechte Taten zu unterlassen, die Armen zu lieben, und dass Du mir vergibst und Dich meiner erbarmst. Und wenn Du eine Prüfung über ein Volk bringen willst, dann nimm mich zu Dir, ohne dass ich davon betroffen bin.",
    "transliteration": "Allahumma inni as'aluka fi'lal-khayrat, wa tarkal-munkarat, wa hubbal-masakeen, wa an taghfira lee wa tarhamanee, wa idha aradta fitnata qawmin fatawaffanee ghayra maftoon",
    "source": "Hadith (Tirmidhi)",
    "category": "Repentance"
  },
  {
    "arabicText": "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ، وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ",
    "englishTranslation": "O Allah, I ask You for Your pleasure and Paradise, and I seek refuge in You from Your displeasure and the Fire.",
    "turkishTranslation": "Allah'ım, Senden rızanı ve cenneti istiyorum. Gazabından ve ateşten Sana sığınıyorum.",
    "germanTranslation": "O Allah, ich bitte Dich um Dein Wohlgefallen und das Paradies, und ich suche Zuflucht bei Dir vor Deinem Zorn und dem Feuer.",
    "transliteration": "Allahumma inni as'aluka ridaka wal-jannah, wa a'oodhu bika min sakhatika wan-nar",
    "source": "Hadith (Abu Dawud, Tirmidhi)",
    "category": "Repentance"
  }
]
;

  (async () => {
    try {
      // ✅ Authenticate as admin
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log("✅ Admin authenticated.");
  
      // ➕ Add duas
      for (const dua of duasData) {
        try {
          const record = await pb.collection('duas').create(dua);
          console.log("✅ Added:", record.id);
        } catch (err) {
          console.error("❌ Failed to add:", dua.arabicText, "\nReason:", err.message);
        }
      }
  
      console.log("🎉 All duas processed.");
      pb.authStore.clear(); // optional logout
    } catch (err) {
      console.error("🚨 Admin login failed:", err.message);
    }
  })();
  
