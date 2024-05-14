'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "7752603a4a26051205b45b317d0174a9",
"index.html": "b9d3354bdcf51d700c98afdfb5a7a984",
"/": "b9d3354bdcf51d700c98afdfb5a7a984",
"main.dart.js": "a824f4f83a904f3e06bf601a29d2a7e4",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "9c01e90db0eb1ea06c3e3511b529646f",
"icons/Icon-192.png": "fe16176f405d241cf5a7ac281080471d",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "e79e77bb9ba6881cba18c972cb4bbadb",
"manifest.json": "fd091ea5bc8f3ccc10f74bd67179fb6a",
"assets/AssetManifest.json": "bf998c990f871bf82fdba105baf56cd2",
"assets/NOTICES": "47f78ffe41f0b82f4fa3b7364eee68b2",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin.json": "b336ca9661cbaf530188051091efae4a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "005e263058a4f5905fff5ad0edd50986",
"assets/fonts/MaterialIcons-Regular.otf": "cbfef70248466147de5095fbe50625a1",
"assets/assets/images/flutter_logo.png": "478970b138ad955405d4efda115125bf",
"assets/assets/images/trophy.png": "b6439747e33eec5ef89f3d0628211972",
"assets/assets/images/2.0x/flutter_logo.png": "4efb9624185aff46ca4bf5ab96496736",
"assets/assets/images/game-over.png": "288b35a01eb7845261a8740309d5854e",
"assets/assets/images/3.0x/flutter_logo.png": "b8ead818b15b6518ac627b53376b42f2",
"assets/assets/images/placeholder.png": "ea52ec10580e866f138fd60d0c06e5e2",
"assets/assets/images/Motos/bugatti.jpg.Attribution.txt": "0a6e91d123191ca2e105ac09ce1e0b80",
"assets/assets/images/Motos/Ford_GT.jpg": "7441386906d7ef773f982767e44b29b9",
"assets/assets/images/Motos/cadillac_escalade.jpg": "353de65706fe9079dcc5975fadfd1b57",
"assets/assets/images/Motos/renault.jpg": "ae4b4e6c96480ff32c771033e4994711",
"assets/assets/images/Motos/LexusLFA.jpg.Attribution.txt": "d04ffaf718ba6feb40b36fa11164efd8",
"assets/assets/images/Motos/Maybach_62_S.jpg.Attribution.txt": "b116ab67aaccf87e244402166c964ca2",
"assets/assets/images/Motos/Maserati_Ghibli.jpg": "90bc5d001b83e58e3d42a4b6c2e839c3",
"assets/assets/images/Motos/AR8C-Competizione.jpg": "51a708b6f14a0cb9e0e3abf84bad2eaa",
"assets/assets/images/Motos/BMW_M1.jpg": "c3f1a790182067b55ed5af33efbe15f6",
"assets/assets/images/Motos/belAir.jpg.Attribution.txt": "4c712584e7c6bfc116dd365f2ac8ff17",
"assets/assets/images/Motos/Mercedes_300_SL.JPG.Attribution.txt": "9e5866791f576d3d5c52305af2387884",
"assets/assets/images/Motos/vw-t6.jpg.Attribution.txt": "d6cc740edbf93520901758030d86a000",
"assets/assets/images/Motos/corvette.webp.Attribution.txt": "7ffbb0be19f4c378bae1529f1bef80d6",
"assets/assets/images/Motos/BMW_M3_GTS.jpg": "44ffa9b2cac763d955486d52f9397f90",
"assets/assets/images/Motos/Benz-Patent-Motorwagen.jpg": "38856d5ae3e669b6cd2634a15ffdd694",
"assets/assets/images/Motos/AR8C-Competizione.jpg.Attribution.txt": "c206cf313c9cae1e5c4de11bb7a847c2",
"assets/assets/images/Motos/Lamborghini_Murcielago.webp": "e5eedc732b833188f85ed65ed2e18cc2",
"assets/assets/images/Motos/jaguar.webp.Attribution.txt": "7ffbb0be19f4c378bae1529f1bef80d6",
"assets/assets/images/Motos/Tesla_Roadster.jpg.Attribution.txt": "3f9eca1fe2d58046304cbfa57becba39",
"assets/assets/images/Motos/Toyota_Land_Cruiser_70.jpg.Attribution.txt": "0d3028ae6bb1155f0777f6149d9158c2",
"assets/assets/images/Motos/Range_Rover.jpg": "7b39ce56754eb26f6ff1677e0e6f81b0",
"assets/assets/images/Motos/Toyota_Supra.jpg.Attribution.txt": "c6022dd89112cf8f907ad459c27f11a3",
"assets/assets/images/Motos/vw-t6.jpg": "65a01c11b26c5fbadcf220c8d9d5664f",
"assets/assets/images/Motos/VW_Kaefer.jpg": "b04189349282ffbab3f29d7056e0c73f",
"assets/assets/images/Motos/dacia_duster.jpg": "770e87d8f51b0f323d6a760079ee263e",
"assets/assets/images/Motos/tata-nano.JPG": "d1dae4d4312775f73138d9b4098976f4",
"assets/assets/images/Motos/Toyota_Mirai.jpg.Attribution.txt": "c1d54f5ef68b1bca95ef5a1af9e868aa",
"assets/assets/images/Motos/Wiesmann.jpg": "5b3f5e159ed8a2635f5cd8fc4c588dc9",
"assets/assets/images/Motos/Mercedes-AMG_GT_R.webp.Attribution.txt": "7ffbb0be19f4c378bae1529f1bef80d6",
"assets/assets/images/Motos/LaFerrari.jpg": "f294d9a02575245079083d63dd809f5c",
"assets/assets/images/Motos/BMWi3.jpg.Attribution.txt": "e9c0c83b0ddb116e9f49dc5cde143297",
"assets/assets/images/Motos/Fiat_Multipla.jpg.Attribution.txt": "c0392ae4bcda28c1370b11e0f357a64a",
"assets/assets/images/Motos/Bentley_Continental_GT.jpg.Attribution.txt": "f50563de0ace47ee143226bf95c457bf",
"assets/assets/images/Motos/Maybach_62_S.jpg": "f35c396155195287283883be4c2d2117",
"assets/assets/images/Motos/background_old.jpg": "f1d7b48a183ef48e07287f9b2fffc7ea",
"assets/assets/images/Motos/Porsche_Taycan.webp": "85cfe15c1cfe9ff42e88a220dd3a8835",
"assets/assets/images/Motos/Fiat_Multipla.jpg": "91fd1aa504ce53ebe233c0656240ca1c",
"assets/assets/images/Motos/opelManta.jpg.Attribution.txt": "a6fe364b10429b2786850f16c5eea833",
"assets/assets/images/Motos/vw-golf.jpg.Attribution.txt": "163a9a8823faad9b41794198ddca81f8",
"assets/assets/images/Motos/Audi_R18_e-tron_quattro.jpg.Attribution.txt": "84603e96362df9ea71009e63f1489512",
"assets/assets/images/Motos/McLaren.jpg": "c216360f91988016b8c0531813fd4b1e",
"assets/assets/images/Motos/RimacNevera.jpg.Attribution.txt": "77b9ffdf83d20952014c4a76123e6795",
"assets/assets/images/Motos/Mitsubishi_Evo.jpg": "794f8e3ca4753ff476f0de330c7deec7",
"assets/assets/images/Motos/Hyundai_Ioniq_5.jpg.Attribution.txt": "010757780a178e7eca5b33316c77f6c2",
"assets/assets/images/Motos/cadillac_escalade.jpg.Attribution.txt": "85e5cc803d558ec0e02dc5d226bfc05b",
"assets/assets/images/Motos/RimacNevera.jpg": "9af623bc544279d3bb742a22857d6fb3",
"assets/assets/images/Motos/porsche911.jpg.Attribution.txt": "c4ea2c0f27982eb577b0222f2b430588",
"assets/assets/images/Motos/hummer_h1.jpg": "4bc36db9a804eaf461e3260d8062cf1a",
"assets/assets/images/Motos/Mercedes_G_6x6.webp": "09342e4d9e17bb762cb715e34f6ee497",
"assets/assets/images/Motos/Mercedes-Benz_SLS_Electric_Drive.jpg": "95c1b6e04aeece7f6b0715721a7bf290",
"assets/assets/images/Motos/Honda_NSX.jpg": "fd7e4ab94c843c531fe2325b7cc9496e",
"assets/assets/images/Motos/porsche959.jpg.Attribution.txt": "75ca9d3ecdb001f55a3b621c14d85c78",
"assets/assets/images/Motos/f1.webp": "cf7f32994bf2596e6cce872b5c5b3daa",
"assets/assets/images/Motos/Ford_Model_T.jpg.Attribution.txt": "bb7b4f9b5cbc32ee6b71c9774d9ee0e6",
"assets/assets/images/Motos/landrover.jpg.Attribution.txt": "bc450ee232b88004e377a4910ad1c763",
"assets/assets/images/Motos/belAir.jpg": "94cbd08c7bb657a20d1114b27aa7f42a",
"assets/assets/images/Motos/VW_Kaefer.jpg.Attribution.txt": "c606ff8ccd04849fc712e381e8c81c13",
"assets/assets/images/Motos/LaFerrari.jpg.Attribution.txt": "5bca25906ee37916042f4166f074a94b",
"assets/assets/images/Motos/Lamborghini_Countach.jpg.Attribution.txt": "b6999a5ca4f3b408b2fde5f9d3eac3dc",
"assets/assets/images/Motos/Ferrari_F40.jpg.Attribution.txt": "4fcccde2c543234759152df30db7313a",
"assets/assets/images/Motos/Aston_Martin_DB5_Vantage.jpg": "1561bb0426960ffb73e95d57895fa18d",
"assets/assets/images/Motos/Aston_Martin_DB5_Vantage.jpg.Attribution.txt": "7359785d2457baec5e267133184bd068",
"assets/assets/images/Motos/Benz-Patent-Motorwagen.jpg.Attribution.txt": "4195f148efe02efddd08dc30379abe2d",
"assets/assets/images/Motos/Ford_GT.jpg.Attribution.txt": "b5229060dc983cbac3a0a7affc565501",
"assets/assets/images/Motos/Toyota_Mirai.jpg": "4519887ae83846775c1f6843e5716b7e",
"assets/assets/images/Motos/Nissan350Z.jpg": "0a740bb5322f7db51d1ac0461dbfa617",
"assets/assets/images/Motos/BYD_Qin.jpg": "c82dc8ad68fb6a27f2ca31638cd29584",
"assets/assets/images/Motos/vw-golf.jpg": "2b5d68dada76cc2abeb54fce83e05e47",
"assets/assets/images/Motos/BMW_507.jpg.Attribution.txt": "497db67aef0f82a6c426ed32151fcdc3",
"assets/assets/images/Motos/tesla-plaid.jpg.Attribution.txt": "1216df50770a248a1c66db3034ce4555",
"assets/assets/images/Motos/fiat500.jpg": "719e6bfae02fc5ff45d64065852cdee3",
"assets/assets/images/Motos/Ford_Model_T.jpg": "e2e891dabb71bb49451660032fe39e15",
"assets/assets/images/Motos/audi_quattro.jpg.Attribution.txt": "00f9bde8499eb317e44332f11d24b3ec",
"assets/assets/images/Motos/Dodge_Ram.jpg": "6f5ebde2dfa57b2159a44a3f98228616",
"assets/assets/images/Motos/background.jpg": "422f7740cb99bdeda65df233d7fd250c",
"assets/assets/images/Motos/Ferrari_F40.jpg": "bb9c8cdba01c56b8388a9d4d8825a1e0",
"assets/assets/images/Motos/tata-nano.JPG.Attribution.txt": "c6cd5f381ad4bd53eaf37755c67cfe36",
"assets/assets/images/Motos/koenigsegg.jpg.Attribution.txt": "497b53176e3053eb11e089b02ef70917",
"assets/assets/images/Motos/BMW_2002_Turbo.jpg.Attribution.txt": "c438512a013b4d25b8bf185ae69b271e",
"assets/assets/images/Motos/Nissan350Z.jpg.Attribution.txt": "7c18b761838b19849d34bc374c01e7f0",
"assets/assets/images/Motos/corvette.webp": "fb87da78539cf435b86009cd378a74ce",
"assets/assets/images/Motos/Chevrolet_Camaro.jpg.Attribution.txt": "01ecd51c938c816d79bd0e763e0b5859",
"assets/assets/images/Motos/Mercedes-Benz_600.jpg": "e334ec913e71d00637e362560d98bfd2",
"assets/assets/images/Motos/McLaren.jpg.Attribution.txt": "61a008bda7a2f6fc8fa9fff9c4a3a2eb",
"assets/assets/images/Motos/smart.webp.Attribution.txt": "7ffbb0be19f4c378bae1529f1bef80d6",
"assets/assets/images/Motos/Lamborghini_Murcielago.webp.Attribution.txt": "9bd333f1abafa287035fa82282aff659",
"assets/assets/images/Motos/porsche959.jpg": "809a471ad35b46860be6b0163818cc58",
"assets/assets/images/Motos/Toyota_Land_Cruiser_70.jpg": "91a92f8fa066d9e7d2105659b4eb9ed8",
"assets/assets/images/Motos/tesla-plaid.jpg": "a704dd766ae8cdf78920cb879701f9ac",
"assets/assets/images/Motos/Mercedes_300_SL.JPG": "27820e2c4cfe65f721178c05d8e653af",
"assets/assets/images/Motos/Jeep_Wrangler.jpg": "9c6321eb90ec50da9f1b4996dc99c8e8",
"assets/assets/images/Motos/koenigsegg.jpg": "c31832e8b4a4c46bbf73bef614407e66",
"assets/assets/images/Motos/smart.webp": "bc272b9add9da05befdc0c885694e1fe",
"assets/assets/images/Motos/Wiesmann.jpg.Attribution.txt": "97b2ea0811e8a7e658575adb52e51e29",
"assets/assets/images/Motos/Maserati_Ghibli.jpg.Attribution.txt": "97b2ea0811e8a7e658575adb52e51e29",
"assets/assets/images/Motos/Mitsubishi_Evo.jpg.Attribution.txt": "ba6b59de55855f81680a2b9cb10cd985",
"assets/assets/images/Motos/DeLorean_DMC.jpg.Attribution.txt": "c1b0308549a27b482912845c798f1550",
"assets/assets/images/Motos/DeLorean_DMC.jpg": "a14305655741bbe552dba427ad565424",
"assets/assets/images/Motos/bugatti.jpg": "38f0da0c86a5b185432a5829b5aba28b",
"assets/assets/images/Motos/Ford_Shelby_GT350.jpg": "042261b1f2ca5077de315188b121db16",
"assets/assets/images/Motos/Lamborghini_Countach.jpg": "791b3c024bf592e007ecd01ec80a2f53",
"assets/assets/images/Motos/Rolls-Royce_Ghost.webp.Attribution.txt": "f9c57464e17b129c877c23365f471855",
"assets/assets/images/Motos/Chevrolet_Camaro.jpg": "aab97b4c5a0b51374af2be8cd226e924",
"assets/assets/images/Motos/Mini.jpg": "01825b778f4ae4bce48fcdfd86448fe0",
"assets/assets/images/Motos/Ford_Shelby_GT350.jpg.Attribution.txt": "124f8153a66b5d55cdf81117e1911b10",
"assets/assets/images/Motos/Bentley_Continental_GT.jpg": "8e51f6e8d7a9c9b9d37c2ceecb984dc1",
"assets/assets/images/Motos/f1.webp.Attribution.txt": "7ffbb0be19f4c378bae1529f1bef80d6",
"assets/assets/images/Motos/Zenvo_ST1.jpg.Attribution.txt": "52b2954ea9c2a2d31dafc85e46a7d8ce",
"assets/assets/images/Motos/Jeep_Wrangler.jpg.Attribution.txt": "6f172065b3d14b1d78f0cc08df0c88dc",
"assets/assets/images/Motos/Porsche_Cayenne.jpg.Attribution.txt": "97aba078772d4f48083723d6f575c9a0",
"assets/assets/images/Motos/Audi_R18_e-tron_quattro.jpg": "05212ea912a39f5e3273f0ff2497876e",
"assets/assets/images/Motos/Citroen_DS.jpg.Attribution.txt": "4195f148efe02efddd08dc30379abe2d",
"assets/assets/images/Motos/BMW_507.jpg": "88067e930ee332e25c8d465bcb48b369",
"assets/assets/images/Motos/porsche911.jpg": "afc64c1f6049123c629f20338d317f47",
"assets/assets/images/Motos/Tesla_Roadster.jpg": "48ff752c333dc86536bd52cc695faeca",
"assets/assets/images/Motos/aston-martin-one-77.jpg.Attribution.txt": "52f3ab87d5edf86bd78693908f6a14e8",
"assets/assets/images/Motos/jaguar.webp": "231280bb5bc1c4f7ab9f20fbab7e0072",
"assets/assets/images/Motos/nissan.jpg.Attribution.txt": "e404c75d693ee5b67fd20557a4ca36f3",
"assets/assets/images/Motos/fiat500.jpg.Attribution.txt": "abe970453c386707680d3343cf400216",
"assets/assets/images/Motos/Aston_Martin_V8_Vantage.jpg": "8fce3fffb178ef04a1fad5ae2d43653e",
"assets/assets/images/Motos/BYD_Qin.jpg.Attribution.txt": "e70f3cd98f8e959b3f4cbbc29981b01a",
"assets/assets/images/Motos/Porsche_Cayenne.jpg": "0bc37948a25ba333c14248a54fe288b7",
"assets/assets/images/Motos/opelManta.jpg": "91c99401543a794b678567d8277779c2",
"assets/assets/images/Motos/Rolls-Royce_Ghost.webp": "7c5b8e9d96a61037daa35455738f18b0",
"assets/assets/images/Motos/dacia_duster.jpg.Attribution.txt": "34132120218604a7dedb535282e252f4",
"assets/assets/images/Motos/Honda_NSX.jpg.Attribution.txt": "d7933c38b3a7a54a62efd335ff444f63",
"assets/assets/images/Motos/Hyundai_Ioniq_5.jpg": "9535401deba25891dfedbbface5765a4",
"assets/assets/images/Motos/BMW_M3_GTS.jpg.Attribution.txt": "5ab7942515d7702b9d630beb4a12bee9",
"assets/assets/images/Motos/Dodge_Ram.jpg.Attribution.txt": "fdc31a5804fc07e133d471dd58a4d45d",
"assets/assets/images/Motos/audi_Q8_e-tron.jpg.Attribution.txt": "acc833ed410b0d2a92ac75a90985baf8",
"assets/assets/images/Motos/Mercedes-Benz_600.jpg.Attribution.txt": "cc19951ef37d116f2e04ddd0c80af7eb",
"assets/assets/images/Motos/BMW_M1.jpg.Attribution.txt": "047dd41a395a22b0c50bc6d3eccc80e5",
"assets/assets/images/Motos/BMW_2002_Turbo.jpg": "e32c50bb66f515e83d2b0388fe33d32b",
"assets/assets/images/Motos/audi_Q8_e-tron.jpg": "d8d92628fed038235f77ae29f239e814",
"assets/assets/images/Motos/Mercedes_G_6x6.webp.Attribution.txt": "7ffbb0be19f4c378bae1529f1bef80d6",
"assets/assets/images/Motos/Zenvo_ST1.jpg": "5d28bd8e07f38aa17babe6ea0a0251cf",
"assets/assets/images/Motos/LexusLFA.jpg": "cec3e99306698d7f6fddc9c5a50eeaf6",
"assets/assets/images/Motos/aston-martin-one-77.jpg": "9d402752b28d00f9e39c02a46c281183",
"assets/assets/images/Motos/mazda.jpg.Attribution.txt": "37c75a98cc550c048330173e1c663846",
"assets/assets/images/Motos/Porsche_Taycan.webp.Attribution.txt": "acc833ed410b0d2a92ac75a90985baf8",
"assets/assets/images/Motos/nissan.jpg": "18095d11f9e1f20f5ccd1293e4f7b43c",
"assets/assets/images/Motos/Aston_Martin_V8_Vantage.jpg.Attribution.txt": "1c5e5a2525dc267d178febb333d6f4f2",
"assets/assets/images/Motos/BMWi3.jpg": "d62999288f17bd5d81333e09e40675ec",
"assets/assets/images/Motos/Mercedes-Benz_SLS_Electric_Drive.jpg.Attribution.txt": "2e0bc1d50bae02f78314e9d15e868468",
"assets/assets/images/Motos/Citroen_DS.jpg": "b9b45645c664ddefbe36bf4136f52af6",
"assets/assets/images/Motos/audi_quattro.jpg": "a94c47baa4ca87d1e900eaf6425b3f09",
"assets/assets/images/Motos/hummer_h1.jpg.Attribution.txt": "998b0dae68b7e8df515cc50021dda7ba",
"assets/assets/images/Motos/mazda.jpg": "7c92f9bcdf2109acff4f7972e7571fa9",
"assets/assets/images/Motos/Toyota_Supra.jpg": "39929ef07fb178c538088557b200af59",
"assets/assets/images/Motos/landrover.jpg": "3f8e42d5da961e38286ca28710091bb9",
"assets/assets/images/Motos/Mercedes-AMG_GT_R.webp": "a7bdd444e42b3af4239157f41c279e2a",
"assets/assets/images/Motos/Mini.jpg.Attribution.txt": "1f25b8b6987646edc857039de659a24d",
"assets/assets/images/Motos/Range_Rover.jpg.Attribution.txt": "c3c00b266529bd81ea188959446da3b5",
"assets/assets/images/trump-cards-logo-shadow.png": "3bccf18d826a1407ef7b6a5e2ae5ba39",
"assets/assets/data/motos.json": "a0dc72515b5878941f2df0988c507ec4",
"assets/assets/translations/zh.json": "abbc2b868548fc9a4dcb69af226d00ab",
"assets/assets/translations/ja.json": "b32d15980d261fe2cb0a79d6443f9c80",
"assets/assets/translations/de.json": "751f320c437bb0a05439ce4648c71f13",
"assets/assets/translations/ru.json": "9bb78c2adcf5bbd45af6df855d245d33",
"assets/assets/translations/pt.json": "9c7e0b61fcaeae923296189f8f133a37",
"assets/assets/translations/en.json": "a8e62a3d0c4f09867a2b0d3c2d0ed54d",
"assets/assets/translations/fr.json": "46274d8b0523be52ad222589e8b21f32",
"assets/assets/translations/hi.json": "9cc1b6dce14a0c0b1e1e38f7e60a85da",
"assets/assets/translations/ko.json": "cc88e342b863c67d4b80aa720980b564",
"assets/assets/translations/es.json": "2010797a156351ed812187a62dc046bf",
"assets/assets/translations/ar.json": "8151bd367a37943b253838ebf5c37c8f",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
