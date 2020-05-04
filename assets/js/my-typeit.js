

new TypeIt("#home-subtitle", {
  speed: 140,
  startDelay: 2000,  
  waitUntilVisible: true,  
})
  .type("Hello,")
  .pause(500)
  .type(" I'm Budi ☕")
  .pause(1800)
  .type(" Backend Developer💻")
  .pause(900)
  .type(" from Bandung,")
  .pause(500)
  .type(" Indonesia")
  .go();
