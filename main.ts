// PART 1 - Projectiles
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (current_Projectiles < maximum_Projectiles) {
        Bullet = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 . . . . . . . 
            . . . . . 2 3 1 3 2 . . . . . . 
            . . . . . 3 1 1 1 3 . . . . . . 
            . . . . . 3 1 1 1 3 . . . . . . 
            . . . . . 3 1 1 1 3 . . . . . . 
            . . . . . 3 1 1 1 2 . . . . . . 
            . . . . . 2 1 1 1 2 . . . . . . 
            . . . . . 2 3 1 3 2 . . . . . . 
            . . . . . . 3 1 3 . . . . . . . 
            . . . . . . 2 1 2 . . . . . . . 
            . . . . . . 2 1 2 . . . . . . . 
            . . . . . . 2 1 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        Bullet.setPosition(Heroine.x, Heroine.y)
        Bullet.setVelocity(0, -30)
        Bullet.setFlag(SpriteFlag.AutoDestroy, true)
        current_Projectiles += 1
    }
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    current_Projectiles += -1
})
// PART 4 Villains be gone
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    sprites.destroy(sprite, effects.fire, 500)
    if (enemy_Velocity < top_Speed) {
        enemy_Velocity += 2
    }
})
// PART 3 Collision alert!
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
})
// PART 1 - Main sprite
let Attacker: Sprite = null
let Bullet: Sprite = null
let top_Speed = 0
let enemy_Velocity = 0
let maximum_Projectiles = 0
let current_Projectiles = 0
let Heroine: Sprite = null
scene.setBackgroundColor(9)
Heroine = sprites.create(img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c 4 4 c c c c f . 
    . f f c c 4 4 4 4 c c f f . 
    . f f f b f 4 4 f b f f f . 
    . f f 4 1 f d d f 1 4 f f . 
    . . f f d d d d d d f f . . 
    . . e f e 4 4 4 4 e f e . . 
    . e 4 f b 3 3 3 3 b f 4 e . 
    . 4 d f 3 3 3 3 3 3 c d 4 . 
    . 4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `, SpriteKind.Player)
Heroine.setPosition(57, 110)
controller.moveSprite(Heroine)
Heroine.setStayInScreen(true)
current_Projectiles = 0
let Difficulty = game.askForNumber("1. Easy 2. Normal 3. Hard", 1)
if (Difficulty == 1) {
    maximum_Projectiles = 5
    enemy_Velocity = 20
    top_Speed = 50
} else if (Difficulty == 2) {
    maximum_Projectiles = 3
    enemy_Velocity = 35
    top_Speed = 60
} else {
    maximum_Projectiles = 2
    enemy_Velocity = 50
    top_Speed = 80
}
// Part 2 - ENEMIES
game.onUpdateInterval(1000, function () {
    Attacker = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.Enemy)
    Attacker.setPosition(randint(0, 120), -10)
    Attacker.setVelocity(0, enemy_Velocity)
    Attacker.setFlag(SpriteFlag.DestroyOnWall, true)
})
