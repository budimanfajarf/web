const myTypeit = new TypeIt("#home-subtitle", {
  speed: 140,
  startDelay: 2000,  
  waitUntilVisible: true,  
})

myTypeit.type("Hello,")
        .pause(700)
        .type(" I'm Budi ☕")
        .pause(1800)
        .type(" Backend Developer💻")
        .pause(900)
        .type(" from Bandung,")
        .pause(300)
        .type(" Indonesia")
        .go();