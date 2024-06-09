const axios = require("axios");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoZWphcyIsInVzZXJJZCI6OCwiaWF0IjoxNzE3OTU5ODYxLCJleHAiOjE3MTgzMTk4NjF9.Tw3YE2V_RiYQqkur5yH-lYoahdmjcxKBDNfG3ZdjHz8";

const comments = [
  "Amazing shot! The colors are so vivid and lively. It feels like I could step right into this scene and experience it myself.",
  "Love this! The perspective is truly unique and gives the photo an entirely new dimension. It’s clear you have a talent for capturing special moments.",
  "Beautiful picture! The lighting is absolutely perfect, highlighting every detail beautifully. This could easily be on the cover of a magazine.",
  "So stunning! The composition draws me right in and makes me feel like I’m part of the scene. You’ve got an incredible eye for photography.",
  "Incredible view! The scenery looks like a dream, and the way you’ve captured it is nothing short of magical. I can’t stop staring at this photo.",
  "Absolutely gorgeous! The depth of field is spot on, creating a lovely blur that focuses attention on the subject. Truly professional work.",
  "Wow, just wow! The detail in this photo is incredible, and the colors are so rich and vibrant. This is a masterpiece.",
  "This is fantastic! You’ve captured such a beautiful moment that feels both natural and magical. The atmosphere is so serene and inviting.",
  "Lovely scenery! It looks so peaceful and serene, like a perfect escape from the hustle and bustle of daily life. I wish I could visit this place.",
  "Such a great capture! The timing was impeccable, freezing a moment that’s both beautiful and fleeting. You have a great sense of timing.",
  "Breathtaking! The clarity is just amazing, and the way the light plays with the subject is mesmerizing. This is a photo to be proud of.",
  "I wish I was there! This place looks incredible, and the way you’ve captured its beauty makes it even more appealing. Fantastic job.",
  "Awesome! The contrast between light and shadow is superb, adding depth and drama to the photo. It’s a real visual treat.",
  "This made my day! The mood is so uplifting and joyful, it’s impossible not to smile when looking at this photo. Great job!",
  "Perfect! The balance in this photo is flawless, with every element perfectly placed to create a harmonious composition. This is professional-level work.",
  "Epic shot! The action is frozen perfectly in time, capturing a dynamic moment with incredible clarity and detail. You have a real talent for action shots.",
  "You have a great eye! The framing is excellent, drawing attention to the most interesting parts of the scene and creating a compelling image.",
  "Such vibrant colors! They really pop in this shot, making the photo come alive with energy and excitement. This is a feast for the eyes.",
  "This is amazing! The detail is so intricate, capturing every nuance and texture with precision. It’s clear you’ve put a lot of thought into this shot.",
  "Outstanding! The textures are so rich, you can almost feel them through the screen. This is a photo that engages all the senses.",
  "Simply beautiful! The lighting and shadows play so well together, creating a soft, dreamy atmosphere that’s just enchanting. You’ve really outdone yourself.",
  "I love this so much! It evokes such strong emotions and tells a powerful story without needing any words. This is the mark of a true artist.",
  "You’ve got talent! The photo tells a great story and captures a moment in time perfectly. It’s clear you have a real passion for photography.",
  "So peaceful! The atmosphere is incredibly calming, making this photo a perfect escape from the chaos of everyday life. I could look at this all day.",
  "Picture-perfect! Every element is in its right place, creating a harmonious and balanced composition. This is a textbook example of great photography.",
  "What a masterpiece! This should be in a gallery. The level of skill and creativity on display here is truly impressive. Keep up the amazing work.",
  "Love the composition! It’s so well thought out, guiding the viewer’s eye through the scene in a natural and pleasing way. This is excellent work.",
  "Can’t get enough of this! It’s truly mesmerizing, with so many details to discover and appreciate. This is a photo that keeps on giving.",
  "You’re so talented! Your work is always inspiring and shows a real dedication to your craft. I can’t wait to see more of your photos.",
  "Keep up the great work! Your style is unmistakable and your photos are always a highlight of my feed. This one is no exception.",
  "This is pure art! Every detail is perfect, from the composition to the lighting to the colors. This photo is a true masterpiece.",
  "So inspiring! This photo makes me want to travel and explore the world. The way you’ve captured this scene is truly motivational.",
  "I feel like I’m there! The sense of place is strong, making the viewer feel immersed in the scene. This is a great example of powerful photography.",
  "Wonderful! The colors blend so harmoniously, creating a pleasing and balanced image that’s a joy to look at. You have a real talent for color.",
  "Great perspective! It makes the photo stand out and adds a dynamic element that’s really engaging. This is a unique and interesting shot.",
  "You nailed it! The expression is captured perfectly, conveying so much emotion and personality. This is a photo that tells a story.",
  "So serene! It’s like a moment of tranquility frozen in time, offering a peaceful respite from the world. This is a beautiful photo.",
  "Enchanting! There’s a magical quality to this photo that’s hard to put into words. It’s like stepping into a fairy tale. Excellent work.",
  "Beautifully captured! The emotion is palpable, making the viewer feel a connection with the subject. This is a powerful and moving image.",
  "What a view! It’s breathtakingly beautiful, and the way you’ve captured it makes it even more stunning. This is a photo to be proud of.",
  "This is so cool! The creativity is off the charts, and the result is a photo that’s both unique and visually striking. Great job!",
  "I love the lighting! It adds such depth to the photo, creating a rich and dynamic image that’s full of life. This is a real skill.",
  "Pure perfection! Not a single detail is out of place, creating a photo that’s harmonious and balanced. This is a textbook example of great photography.",
  "What a great shot! The subject is so well-framed, making it stand out while still being part of the overall scene. This is excellent work.",
  "This is amazing work! The photo tells a thousand words, capturing a moment in time with incredible clarity and emotion. You have a real gift.",
  "You have a gift! Your photography is top-notch, and this photo is a perfect example of your talent. Keep creating beautiful work.",
  "This made me smile! The joy is contagious, and the photo is full of life and energy. It’s impossible not to feel happy looking at this.",
  "Absolutely stunning! Every detail is crystal clear, and the colors are so rich and vibrant. This is a photo that stands out in every way.",
  "Such detail! The textures are almost tangible, making the photo feel incredibly real. This is a skillful and impressive shot.",
  "Mind-blowing! The composition is masterful, drawing the viewer’s eye through the scene in a natural and pleasing way. This is a real work of art.",
  "I love the vibe! It’s so upbeat and positive, creating a photo that’s full of life and energy. This is a great shot.",
  "You’re amazing! Your skills keep getting better, and this photo is a perfect example of your progress. Keep up the great work.",
  "So artistic! The creativity shines through in every detail, making this a truly unique and interesting photo. You have a real talent.",
  "Perfection! Every element works together flawlessly, creating a photo that’s harmonious and balanced. This is a textbook example of great photography.",
  "Incredible detail! The precision is impressive, capturing every nuance and texture with clarity. This is a skillful and beautiful photo.",
  "Amazing colors! They create such a vibrant image that’s full of life and energy. This is a real feast for the eyes.",
  "You’re so good! This is professional quality, with every detail perfectly captured. You have a real talent for photography.",
  "This is so dreamy! It feels like a fairy tale, with soft lighting and a serene atmosphere. This is a beautiful photo.",
  "Phenomenal! The photo captures the essence perfectly, creating a powerful and moving image. This is a real work of art.",
  "What an angle! It adds such a dynamic feel to the photo, making it stand out and draw the viewer in. This is a great shot.",
  "This is everything! It’s perfect in every way, with every detail perfectly captured. This is a photo to be proud of.",
  "I love the mood! It’s so atmospheric, creating a photo that’s both visually striking and emotionally powerful. This is excellent work.",
  "Fantastic work! The effort shows in every detail, creating a photo that’s rich and engaging. This is a real testament to your skill.",
  "So creative! This is truly original, with a unique perspective that makes the photo stand out. You have a real talent for creativity.",
  "This is so unique! I’ve never seen anything like it, making it a truly special photo. This is a real testament to your creativity.",
  "Impressive! The level of skill is evident, with every detail perfectly captured. This is a photo to be proud of.",
  "Great shot! The moment is captured perfectly, freezing a beautiful and fleeting moment in time. This is excellent work.",
  "This is pure magic! The photo has a whimsical quality that’s enchanting and delightful. This is a beautiful and creative shot.",
  "So vibrant! The colors are incredibly vivid, creating a photo that’s full of life and energy. This is a real feast for the eyes.",
  "I adore this! It’s simply beautiful, with every detail perfectly captured. This is a photo that’s a joy to look at.",
  "What a moment! You’ve captured it perfectly, freezing a beautiful and fleeting moment in time. This is excellent work.",
  "You captured this perfectly! The timing is impeccable, freezing a moment that’s both beautiful and fleeting. You have a great sense of timing.",
  "This is extraordinary! Every detail is immaculate, creating a photo that’s rich and engaging. This is a real testament to your skill.",
  "Beautiful light! It adds such warmth to the photo, creating a rich and dynamic image that’s full of life. This is excellent work.",
  "Gorgeous! The subject is stunning, and the photo captures its beauty perfectly. This is a photo to be proud of.",
  "Such clarity! Every element is sharply defined, creating a photo that’s crisp and clear. This is a skillful and impressive shot.",
  "Stunning work! You’ve really outdone yourself, creating a photo that’s rich and engaging. This is a real testament to your skill.",
  "Love the shadows! They add so much depth to the photo, creating a rich and dynamic image that’s full of life. This is excellent work.",
  "You’re so talented! Your work always stands out, and this photo is a perfect example of your skill. Keep up the great work.",
  "Incredible! The photo is flawless, with every detail perfectly captured. This is a real testament to your skill.",
  "This is so peaceful! The scene is so calming, creating a photo that’s a perfect escape from the chaos of everyday life.",
  "What a capture! The expression is just right, conveying so much emotion and personality. This is a photo that tells a story.",
  "This is perfect! Everything about it is spot on, creating a photo that’s harmonious and balanced. This is a textbook example of great photography.",
  "This is so captivating! It’s hard to look away, with so many details to discover and appreciate. This is a photo that keeps on giving.",
  "Great timing! You caught the perfect moment, freezing a beautiful and fleeting moment in time. This is excellent work.",
  "This is so cool! The angle is really interesting, adding a dynamic element that’s really engaging. This is a unique and interesting shot.",
  "You’ve got a great eye! The composition is superb, drawing attention to the most interesting parts of the scene and creating a compelling image.",
  "So well done! The effort shows in every detail, creating a photo that’s rich and engaging. This is a real testament to your skill.",
  "Absolutely amazing! This is gallery-worthy, with every detail perfectly captured. This is a real testament to your skill.",
  "This is top-notch! The quality is outstanding, with every detail perfectly captured. This is a photo to be proud of.",
  "I love everything about this! It’s perfect in every way, with every detail perfectly captured. This is a photo to be proud of.",
  "You’re so creative! Your work is always unique, and this photo is a perfect example of your creativity. Keep up the great work.",
  "This is so charming! It’s delightful to look at, with every detail perfectly captured. This is a photo to be proud of.",
  "Incredible moment! You’ve captured it perfectly, freezing a beautiful and fleeting moment in time. This is excellent work.",
  "So well captured! The emotion is real, making the viewer feel a connection with the subject. This is a powerful and moving image.",
  "I can’t stop looking at this! It’s mesmerizing, with so many details to discover and appreciate. This is a photo that keeps on giving.",
  "What a shot! The subject is perfectly framed, making it stand out while still being part of the overall scene. This is excellent work.",
  "Simply stunning! Every detail is exquisite, creating a photo that’s rich and engaging. This is a real testament to your skill.",
  "This is so beautiful! It’s a joy to look at, with every detail perfectly captured. This is a photo to be proud of.",
  "You’re amazing at this! Your talent is evident in every detail, creating a photo that’s rich and engaging. This is a real testament to your skill.",
];

function randomComment() {
  return comments[Math.floor(Math.random() * comments.length)];
}

async function postComments() {
  for (let i = 0; i < 51; i++) {
    axios
      .post(
        `http://localhost:5000/api/photos/comment/${i}`,
        { comment: randomComment() },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(`Comment posted on photo ${i}!`);
      })
      .catch((err) => {
        console.log("Error posting comment!");
      });
  }
}

postComments();
