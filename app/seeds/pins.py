from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pins():
    pin1 = Pin(
        user_id = 1,
        name = 'Enchanted Forest Retreat',
        description = 'Lose yourself in the magic of an ancient forest with towering trees and moss-covered trails.',
        alt_text = 'Sunlight streaming through tall trees in a mystical forest.',
        website = 'https://totallythebomb.com/you-can-visit-a-treetop-skywalk-in-tennessee-that-has-the-longest-tree-based-bridges-in-america',
        images = 'https://i.pinimg.com/564x/37/81/48/378148ebb3451ced7ce554ad7fe949ae.jpg'
    )
    pin2 = Pin(
        user_id = 2,
        name = 'Floating Village Adventure',
        description = 'Explore a charming village that sits atop tranquil waters, offering a glimpse into a unique way of life.',
        alt_text = 'Colorful houses on stilts over calm water.',
        website = 'https://www.myticklefeet.com/best-of-siem-reap-temples-and-attractions-3-day-cambodia-itinerary/20180107_171430/#main',
        images = 'https://i0.wp.com/www.myticklefeet.com/wp-content/uploads/2019/02/20180107_171430.jpg?ssl=1'
    )
    pin3 = Pin(
        user_id = 3,
        name = "Cave Dwelles's Haven",
        description = 'Discover an otherworldly underground city carved into rock, filled with history and wonder.',
        alt_text = 'Intricate rock formations in an underground cave.',
        website = 'https://www.boredpanda.com/scotland-landscape-photography/?utm_source=tudoporemailm&utm_medium=referral&utm_campaign=organic',
        images = 'https://static.boredpanda.com/blog/wp-content/uploads/2014/06/scotland-landscape-photography-13.jpg'
    )
    pin4 = Pin(
        user_id = 1,
        name = 'Desert Oasis Serenity',
        description = 'Experience the contrast of vast desert landscapes and an oasis brimming with life and calm.',
        alt_text = 'Palm trees surrounding a serene desert oasis.',
        website = 'https://www.hotelsinheaven.com/habitas-alula/',
        images = 'https://i.pinimg.com/564x/5a/ee/aa/5aeeaab5a41cc17e8f17dde3fe8d3663.jpg'
    )
    pin5 = Pin(
        user_id = 2,
        name = 'Mystical Northern Lights',
        description = 'Witness the ethereal dance of the Northern Lights painting the night sky with vibrant colors.',
        alt_text = 'Aurora Borealis illuminating the dark sky.',
        website = 'https://lsleofskye.tumblr.com/post/641221532598894592/forest-glow-imikegraphics-location-lapland',
        images = 'https://i.pinimg.com/564x/7c/f1/e8/7cf1e8590bd3a07805b8e66d55ed481d.jpg'
    )
    pin6 = Pin(
        user_id = 3,
        name = 'Suspended Mountain Monastery',
        description = 'Visit a monastery perched on a towering mountain, offering breathtaking views and spiritual solace.',
        alt_text = 'Ancient monastery clinging to the side of a mountain.',
        website = 'https://www.thecrazytourist.com/the-50-most-beautiful-places-in-the-world',
        images = 'https://i.pinimg.com/564x/2c/ef/86/2cef86b3f7c90e78f6c93d936f3e8217.jpg'
    )
    pin7 = Pin(
        user_id = 1,
        name = 'Underwater Coral Paradise',
        description = 'Dive into crystal-clear waters to explore a world of vibrant coral reefs and exotic marine life.',
        alt_text = 'Colorful coral reef teeming with underwater creatures.',
        website = 'https://allindonesiatravel.com/diving-pulau-island-raja-ampat-papua/',
        images = 'https://i.pinimg.com/564x/11/e1/21/11e121ebcd3131aba0c30ba969988200.jpg'
    )
    pin8 = Pin(
        user_id = 2,
        name = 'Lost Ruins of the Jungle',
        description = 'Unearth the secrets of ancient ruins hidden deep within lush jungle foliage, a testament to history.',
        alt_text = 'Overgrown temple ruins in a dense jungle.',
        website = 'https://funlifecrisis.com/places-to-visit-in-guatemala/',
        images = 'https://i.pinimg.com/564x/60/2f/8c/602f8c7406ae2dfcf157232b05cae0ae.jpg'
    )
    pin9 = Pin(
        user_id = 3,
        name = 'Whimsical Hobbit Hamlet',
        description = 'Live out your fantasies in a whimsical village reminiscent of Hobbiton, nestled in a picturesque landscape.',
        alt_text = 'Quaint hobbit houses with colorful gardens.',
        website = 'https://www.vacationsmadeeasy.com/TheBLT/16PopularMovieFilmingLocationsWorthSeeinginRealLife.html',
        images = 'https://i.pinimg.com/564x/60/05/3d/60053da9af3c11fefce24007901b2b7d.jpg'
    )
    pin10 = Pin(
        user_id = 1,
        name = 'Surreal Salt Flats Wonderland',
        description = 'Step into a surreal world of endless salt flats, where the ground mirrors the sky in stunning beauty.',
        alt_text = 'Vast salt flats reflecting the sky in perfect symmetry.',
        website = 'https://petapixel.com/2016/07/26/photographer-captures-milky-way-mirrored-flooded-salt-flats/',
        images = 'https://i.pinimg.com/564x/8c/20/a9/8c20a9dc56744741455b38b2dd85643c.jpg'
    )
    pin11 = Pin(
        user_id = 2,
        name = 'Cappadocia Hot Air Balloon Spectacle',
        description = 'Soar over Cappadocia, Turkey, in a hot air balloon, witnessing its iconic fairy chimney rock formations.',
        alt_text = 'Hot air balloons flying over Cappadocia unique landscape.',
        website = 'https://eatlivetraveldrink.com/2019/01/06/best-places-to-visit-in-turkey/',
        images = 'https://i.pinimg.com/564x/3c/9d/5c/3c9d5cc36637d48a6c1a381fad9a22a0.jpg'
    )
    pin12 = Pin(
        user_id = 1,
        name = 'Venice Grand Canal Magic',
        description = 'Experience the romance of Venice, Italy, as you glide through the picturesque Grand Canal in a gondola.',
        alt_text = 'Gondola on the Grand Canal with historic buildings along the water.',
        website = 'https://honestlywtf.com/travel/visiting-venice-italy/',
        images = 'https://i.pinimg.com/564x/8b/8d/22/8b8d22ee3528479ef31e7823b2476730.jpg'
    )
    pin13 = Pin(
        user_id = 2,
        name = 'Antelope Canyon Light Play',
        description = 'Marvel at the intricate light beams dancing through the narrow sandstone crevices of Antelope Canyon, USA.',
        alt_text = 'Sunlight creating stunning beams inside Antelope Canyon walls.',
        website = 'https://tinyurl.com/mwbcz5hs',
        images = 'https://i.pinimg.com/564x/ec/44/7b/ec447be5d3e5754b6eb6f8507c3cb0f3.jpg'
    )
    pin14 = Pin(
        user_id = 3,
        name = 'Great Barrier Reef Underwater Wonderland',
        description = 'Dive into the vibrant world of the Great Barrier Reef, Australia, exploring its stunning coral reefs and marine life.',
        alt_text = 'Colorful coral reef with various fish species underwater.',
        website = 'https://earthandanimals.tumblr.com/post/53305164768',
        images = 'https://tinyurl.com/6aaja2p5'
    )
    pin15 = Pin(
        user_id = 1,
        name = 'Santorini Cliffside Charm',
        description = 'Unwind on the stunning cliffs of Santorini, Greece, enjoying breathtaking sunsets over the Aegean Sea.',
        alt_text = 'White buildings and blue domes overlooking the sea in Santorini.',
        website = 'https://sailing-whitsundays.com/article/how-the-great-barrier-reef-was-formed',
        images = 'https://i.pinimg.com/564x/05/1a/a8/051aa8b0c38bf5f72b2915e1a596ee2c.jpg'
    )
    pin16 = Pin(
        user_id = 2,
        name = 'Machu Picchu Ancient Mystique',
        description = 'Journey to the ancient ruins of Machu Picchu, Peru, where history and stunning landscapes converge.',
        alt_text = 'Machu Picchu ruins against a backdrop of lush green mountains.',
        website = 'https://ochristine.com/blog/2015/review-machu-picchu-lares-trek-valencia-travel-cusco',
        images = 'https://i.pinimg.com/564x/b0/24/c8/b024c8eb375b7872e7596d47c8fc3210.jpg'
    )
    pin17 = Pin(
        user_id = 3,
        name = 'Aurora Borealis in Lapland',
        description = 'Witness the enchanting Northern Lights in Lapland, Finland, painting the night sky with vibrant colors.',
        alt_text = 'Aurora Borealis dancing across the night sky over snowy landscapes.',
        website = 'https://www.superstock.com/asset/aurora-borealis-colours-night-sky-above-camp-tent-lapland-northern/4070-9007',
        images = 'https://i.pinimg.com/564x/ae/16/20/ae1620b07c1825ab9f05e566abe8879f.jpg'
    )
    pin18 = Pin(
        user_id = 1,
        name = 'Petra Rose-Red Beauty',
        description = 'Explore the awe-inspiring archaeological city of Petra, Jordan, famous for its carved rose-red rock structures.',
        alt_text = 'Elaborate rock-carved architecture in Petra, Jordan.',
        website = 'https://tinyurl.com/2mc28ear',
        images = 'https://i.pinimg.com/564x/71/c2/cb/71c2cba8bd0a767fb9d3f553666e6701.jpg'
    )
    pin19 = Pin(
        user_id = 2,
        name = 'Bora Bora Overwater Bungalows',
        description = 'Relax in luxury overwater bungalows in Bora Bora, French Polynesia, surrounded by turquoise waters.',
        alt_text = 'Overwater bungalows on stilts over clear blue water in Bora Bora.',
        website = 'https://tropikaia.com/overwater-bungalows-in-usa/',
        images = 'https://i.pinimg.com/564x/f4/42/a8/f442a83462c7a1a8f0453544c6a49496.jpg'
    )
    pin20 = Pin(
        user_id = 3,
        name = 'Serengeti Great Migration',
        description = 'Witness the stunning spectacle of the Great Migration in the Serengeti, Tanzania, as wildebeests traverse the plains.',
        alt_text = 'Wildebeests on the move during the Great Migration in the Serengeti.',
        website = 'https://www.vacayweather.com/',
        images = 'https://i.pinimg.com/564x/c3/c2/13/c3c213e4249e0a07bfe0bc316c9013ae.jpg'
    )
    pin21 = Pin(
        user_id = 1,
        name = "Santorini's Caldera Views",
        description = "Indulge in the stunning vistas of Santorini's caldera, Greece, as you relax on the edge of volcanic cliffs.",
        alt_text = "Aerial view of Santorini's caldera with blue domed buildings.",
        website = 'https://www.itsallbee.com/2018/08/santorini-3-day-itinerary/',
        images = 'https://i.pinimg.com/564x/ff/03/0d/ff030dec6ae6be52633ac5c8956be18f.jpg'
    )
    pin22 = Pin(
        user_id = 2,
        name = 'Japanese Cherry Blossom Delight',
        description = "Immerse yourself in the beauty of Japan's cherry blossom season, when streets and parks are adorned with delicate pink blooms.",
        alt_text = 'Cherry blossom trees in full bloom along a serene pathway.',
        website = '',
        images = 'https://i.pinimg.com/564x/6d/80/99/6d8099bddc65d50fde7f554df8673b3d.jpg'
    )
    pin23 = Pin(
        user_id = 3,
        name = "Eiffel Tower's City of Love",
        description = 'Experience the romance of Paris, France, with the iconic Eiffel Tower casting its enchanting glow over the city.',
        alt_text = 'Eiffel Tower illuminated against the night sky.',
        website = 'https://wanderlustpulse.com/romantic-things-to-do-in-paris/',
        images = 'https://i.pinimg.com/564x/60/f3/62/60f362a59467dababb4840a8e68514b7.jpg'
    )
    pin24 = Pin(
        user_id = 1,
        name = 'Majestic Machu Picchu Sunrise',
        description = 'Catch the awe-inspiring sunrise over the ancient Incan city of Machu Picchu, Peru, for a truly magical experience.',
        alt_text = 'Sunrise over Machu Picchu with misty mountains in the background.',
        website = 'https://picchutravel.com/es/',
        images = 'https://i.pinimg.com/564x/e2/a8/c2/e2a8c27c942305cb13d9e7ff38f04bda.jpg'
    )
    pin25 = Pin(
        user_id = 2,
        name = 'Awe-Inspiring Grand Canyon',
        description = 'Stand at the edge of the Grand Canyon, USA, and witness the vastness and geological wonder of this natural masterpiece.',
        alt_text = 'Panoramic view of the Grand Canyon with layered rock formations.',
        website = 'https://fullsuitcase.com/grand-canyon-in-one-day/',
        images = 'https://i.pinimg.com/564x/e1/2c/14/e12c146e9fb4892527801a7ee459524e.jpg'
    )
    pin26 = Pin(
        user_id = 3,
        name = 'Tropical Paradise in Maldives',
        description = 'Relax in overwater bungalows and indulge in the crystal-clear waters and white sandy beaches of the Maldives.',
        alt_text = 'Overwater bungalows surrounded by turquoise waters in the Maldives.',
        website = 'https://www.ourworldstuff.com/2017/11/maldives-romantic-place-to-visit-any-time.html',
        images = 'https://i.pinimg.com/564x/13/8e/2b/138e2b3393392def33d6f5ff2493c1d1.jpg'
    )
    pin27 = Pin(
        user_id = 1,
        name = 'Intriguing Stonehenge Enigma',
        description = 'Contemplate the mysteries of Stonehenge, UK, as you stand before the enigmatic stone circle, a UNESCO World Heritage site.',
        alt_text = 'Stonehenge with stones arranged in a circular pattern.',
        website = 'https://www.pinterest.com/pin/48835977202676008/',
        images = 'https://i.pinimg.com/564x/58/41/24/58412441e9242613ea8ed2fc99c1e448.jpg'
    )
    pin28 = Pin(
        user_id = 2,
        name = 'African Safari Adventure',
        description = 'Embark on a thrilling safari through the plains of Africa, witnessing the incredible diversity of wildlife in their natural habitat.',
        alt_text = 'Elephants and zebras in the African savannah during a safari.',
        website = 'https://tinyurl.com/2w2hmsrv',
        images = 'https://i.pinimg.com/564x/7a/4b/22/7a4b2201b8aa4a4b9471c23614314a04.jpg'
    )
    pin29 = Pin(
        user_id = 3,
        name = "Taj Mahal's Timeless Beauty",
        description = 'Marvel at the exquisite architecture of the Taj Mahal, India, a testament to eternal love and artistic mastery.',
        alt_text = 'Taj Mahal reflecting in the tranquil waters at sunrise.',
        website = 'https://www.pinterest.com/pin/5348093301561985/',
        images = 'https://i.pinimg.com/564x/e8/45/2b/e8452b4f2df623f32febb51cf8660e81.jpg'
    )
    pin30 = Pin(
        user_id = 1,
        name = 'Enchanting Norwegian Fjords',
        description = 'Cruise through the mesmerizing fjords of Norway, surrounded by towering cliffs and stunning natural landscapes.',
        alt_text = 'Majestic fjord surrounded by lush greenery and calm waters.',
        website = 'https://norwaytravelguide.no/connect-with-locals/Vidar/the-geiranger-fjord',
        images = 'https://i.pinimg.com/564x/17/31/71/17317109bd645fe818d72903987ec811.jpg'
    )
    pin31 = Pin(
        user_id = 2,
        name = 'Trekking the Inca Trail',
        description = 'Embark on a trekking adventure along the historic Inca Trail, leading to the awe-inspiring ruins of Machu Picchu.',
        alt_text = 'Hikers on the Inca Trail with Machu Picchu in the background.',
        website = 'https://www.flickr.com/photos/whimzykat/5208530639/',
        images = 'https://i.pinimg.com/564x/54/c9/4b/54c94ba7abb134062939354de6de9a03.jpg'
    )
    pin32 = Pin(
        user_id = 3,
        name = 'Cycling through Dutch Tulip Fields',
        description = 'Cycle through vibrant tulip fields of the Netherlands during the annual bloom season, surrounded by a riot of colors.',
        alt_text = 'Biker riding through colorful tulip fields in the Netherlands.',
        website = 'https://kipamojo.world/netherlands/Visiting-the-Tulip-Fields-in-Goeree-Overflakkee/',
        images = 'https://i.pinimg.com/564x/85/5f/a2/855fa233e774f21c28076ca730edbafd.jpg'
    )
    pin33 = Pin(
        user_id = 1,
        name = 'Relaxing on Maldives\' Overwater Bungalows',
        description = 'Indulge in luxury and relaxation in an overwater bungalow in the Maldives, with stunning turquoise waters at your doorstep.',
        alt_text = 'Overwater bungalow surrounded by clear turquoise waters in the Maldives.',
        website = '',
        images = 'https://i.pinimg.com/564x/d0/dc/36/d0dc3659f252b20416b350abc6289edd.jpg'
    )
    pin34 = Pin(
        user_id = 2,
        name = 'Cruising the Norwegian Fjords',
        description = 'Embark on a cruise through the dramatic landscapes of the Norwegian fjords, passing waterfalls and towering cliffs.',
        alt_text = 'Cruise ship sailing through a narrow Norwegian fjord with waterfalls.',
        website = 'https://www.flickr.com/photos/florian_boepple/23076034019',
        images = 'https://i.pinimg.com/564x/d4/15/40/d4154088d527d19729595af61c1fcf42.jpg'
    )
    pin35 = Pin(
        user_id = 3,
        name = 'Paragliding Over Swiss Alps',
        description = 'Experience the thrill of paragliding over the stunning Swiss Alps, taking in panoramic views of snow-capped peaks.',
        alt_text = 'Paraglider soaring over the majestic Swiss Alps.',
        website = 'https://www.flickr.com/photos/58772731@N07/15095114676/',
        images = 'https://i.pinimg.com/564x/b8/ae/2c/b8ae2cd5e2a7a0667b4d5268efaea8c6.jpg'
    )
    pin36 = Pin(
        user_id = 1,
        name = 'Cherry Blossom Season in Kyoto',
        description = 'Witness the enchanting cherry blossom season in Kyoto, Japan, as the city is bathed in delicate shades of pink.',
        alt_text = 'Cherry blossoms in full bloom along a serene pathway in Kyoto.',
        website = '',
        images = 'https://i.pinimg.com/564x/ef/19/9d/ef199dbca6b18facef5537086cfa6dce.jpg'
    )
    pin37 = Pin(
        user_id = 2,
        name = 'Rafting the Grand Canyon',
        description = 'Embark on a thrilling white-water rafting expedition through the majestic Grand Canyon, surrounded by towering cliffs.',
        alt_text = 'Rafters navigating the turbulent waters of the Grand Canyon.',
        website = 'https://myfamilytravels.com/grand-canyon-rafting-whitewater-adventures/',
        images = 'https://i.pinimg.com/564x/72/62/32/726232901ccd1f0f18fbac4c0b23c441.jpg'
    )
    pin38 = Pin(
        user_id = 3,
        name = 'Exploring Petra\'s Ancient Treasury',
        description = 'Discover the intricate rock-carved architecture of Petra, Jordan, including the famous Treasury monument.',
        alt_text = 'The iconic Treasury building in Petra illuminated by the sun.',
        website = 'https://www.flickr.com/photos/garymcgovern/6962970818/',
        images = 'https://i.pinimg.com/564x/3e/39/cf/3e39cf1dc9be84fd407576bda3e017dc.jpg'
    )
    pin39 = Pin(
        user_id = 1,
        name = 'Skiing in the Swiss Alps',
        description = 'Hit the slopes in the Swiss Alps, enjoying world-class skiing and snowboarding against a stunning alpine backdrop.',
        alt_text = 'Skier carving through fresh powder snow in the Swiss Alps.',
        website = 'https://alliemtaylor.blog/2019/01/20/10-beautiful-winter-travel-destinations/',
        images = 'https://i.pinimg.com/564x/d4/c4/74/d4c474958f4d3ace301eb5521bb66ca9.jpg'
    )
    pin40 = Pin(
        user_id = 3,
        name = 'Bungee Jumping in Queenstown',
        description = 'Experience the adrenaline rush of bungee jumping in Queenstown, New Zealand, from the iconic Kawarau Bridge.',
        alt_text = 'Bungee jumper in free fall over the turquoise waters of a river.',
        website = 'https://www.theblondeabroad.com/how-to-spend-48-hours-in-queenstown/',
        images = 'https://i.pinimg.com/564x/39/3b/0c/393b0ce0fa6e18220137b240bc4625c2.jpg'
    )



    pins_list = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20, pin21, pin22, pin23, pin24, pin25, pin26, pin27, pin28, pin29, pin30, pin31, pin32, pin33, pin34, pin35, pin36, pin37, pin38, pin39, pin40]
    single_pin = [db.session.add(pin) for pin in pins_list]
    db.session.commit()

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
