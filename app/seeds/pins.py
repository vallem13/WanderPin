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
        user_id = 1,
        name = 'Floating Village Adventure',
        description = 'Explore a charming village that sits atop tranquil waters, offering a glimpse into a unique way of life.',
        alt_text = 'Colorful houses on stilts over calm water.',
        website = 'https://www.myticklefeet.com/best-of-siem-reap-temples-and-attractions-3-day-cambodia-itinerary/20180107_171430/#main',
        images = 'https://i0.wp.com/www.myticklefeet.com/wp-content/uploads/2019/02/20180107_171430.jpg?ssl=1'
    )
    pin3 = Pin(
        user_id = 1,
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
        user_id = 1,
        name = 'Mystical Northern Lights',
        description = 'Witness the ethereal dance of the Northern Lights painting the night sky with vibrant colors.',
        alt_text = 'Aurora Borealis illuminating the dark sky.',
        website = 'https://lsleofskye.tumblr.com/post/641221532598894592/forest-glow-imikegraphics-location-lapland',
        images = 'https://i.pinimg.com/564x/7c/f1/e8/7cf1e8590bd3a07805b8e66d55ed481d.jpg'
    )
    pin6 = Pin(
        user_id = 1,
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
        user_id = 1,
        name = 'Lost Ruins of the Jungle',
        description = 'Unearth the secrets of ancient ruins hidden deep within lush jungle foliage, a testament to history.',
        alt_text = 'Overgrown temple ruins in a dense jungle.',
        website = 'https://funlifecrisis.com/places-to-visit-in-guatemala/',
        images = 'https://i.pinimg.com/564x/60/2f/8c/602f8c7406ae2dfcf157232b05cae0ae.jpg'
    )
    pin9 = Pin(
        user_id = 1,
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
        user_id = 1,
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
        user_id = 1,
        name = 'Antelope Canyon Light Play',
        description = 'Marvel at the intricate light beams dancing through the narrow sandstone crevices of Antelope Canyon, USA.',
        alt_text = 'Sunlight creating stunning beams inside Antelope Canyon walls.',
        website = 'https://tinyurl.com/mwbcz5hs',
        images = 'https://i.pinimg.com/564x/ec/44/7b/ec447be5d3e5754b6eb6f8507c3cb0f3.jpg'
    )
    pin14 = Pin(
        user_id = 1,
        name = 'Great Barrier Reef Underwater Wonderland',
        description = 'Dive into the vibrant world of the Great Barrier Reef, Australia, exploring its stunning coral reefs and marine life.',
        alt_text = 'Colorful coral reef with various fish species underwater.',
        website = '',
        images = ''
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
        user_id = 1,
        name = 'Machu Picchu Ancient Mystique',
        description = 'Journey to the ancient ruins of Machu Picchu, Peru, where history and stunning landscapes converge.',
        alt_text = 'Machu Picchu ruins against a backdrop of lush green mountains.',
        website = 'https://ochristine.com/blog/2015/review-machu-picchu-lares-trek-valencia-travel-cusco',
        images = 'https://i.pinimg.com/564x/b0/24/c8/b024c8eb375b7872e7596d47c8fc3210.jpg'
    )
    pin17 = Pin(
        user_id = 1,
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
        user_id = 1,
        name = 'Bora Bora Overwater Bungalows',
        description = 'Relax in luxury overwater bungalows in Bora Bora, French Polynesia, surrounded by turquoise waters.',
        alt_text = 'Overwater bungalows on stilts over clear blue water in Bora Bora.',
        website = 'https://tropikaia.com/overwater-bungalows-in-usa/',
        images = 'https://i.pinimg.com/564x/f4/42/a8/f442a83462c7a1a8f0453544c6a49496.jpg'
    )
    pin20 = Pin(
        user_id = 1,
        name = 'Serengeti Great Migration',
        description = 'Witness the stunning spectacle of the Great Migration in the Serengeti, Tanzania, as wildebeests traverse the plains.',
        alt_text = 'Wildebeests on the move during the Great Migration in the Serengeti.',
        website = 'https://www.vacayweather.com/',
        images = 'https://i.pinimg.com/564x/c3/c2/13/c3c213e4249e0a07bfe0bc316c9013ae.jpg'
    )

    pins_list = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20]
    single_pin = [db.session.add(pin) for pin in pins_list]
    db.session.commit()

def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
