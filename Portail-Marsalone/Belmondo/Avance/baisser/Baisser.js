class Baisser extends Phaser.Scene {
    //ON PRECHARGE TOUS NOS ASSETS
    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        //PRECHARGE DU SPRITESHEET AVEC LES DIFFERENTES POSITIONS DU PERSONNAGE
        this.load.spritesheet('accroupi', 'assets/accroupi.png', { frameWidth: 26, frameHeight: 25 });
        this.load.spritesheet('acavfull', 'assets/acavfull.png', { frameWidth: 26, frameHeight: 25 });
    }
    //ON DETERMINE DANS LA FONCTION CREATE CE QUE FONT NOS ASSETS
    create ()
    {
        this.add.image(400, 300, 'sky');
//CREATION D'UN GROUPE POUR LA REPETITION D'UN OBJET
        platforms = this.physics.add.staticGroup();//ON DETERMINE SON EMPLACEMENT ET SA TEXTURE

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
//CREATION DES ACTIONS DU PERSONNAGE
        player = this.physics.add.sprite(100, 450, 'dude');

        //player.setBounce(0.2);// REBONDISSEMENT DU PERSONNAGE LORSQU'IL SAUTE
        player.setCollideWorldBounds(true);//COLLISION AVEC TOUS LES OBJETS DU JEU
//CREATION DES ANIMATIONS DU PERSONNAGE GRACE AU SPRITESHEET
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('acavfull', { start: 0, end: 4 }),//CE SONT LES IMAGES 0/1/2/3 QUI SONT JOUEES
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });

        this.anims.create({
            key: 'turn',
            frames: ( { key: 'accroupi', start: 0, end:4 } ),//C'EST L'IMAGE 4 QUI EST JOUEE
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat:-1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('acavfull', { start: 6, end: 10 }),//CE SONT LES IMAGES 5/6/7/8 QUI SONT JOUEES
            frameRate: 10,//NOMBRE D'IMAGES JOUEES
            repeat: -1//REPETITION INFINIE
        });




        this.physics.add.collider(player, platforms);//AJOUT DE COLLISION ENTRE LE PERSONNAGE ET LES PLATFORMES

        this.initKeyboard()
    }

    //LA ON DEFINIT CE QU'IL SE PASSE LORSQU'ON APPUIE SUR TELLE OU TELLE TOUCHE
    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    if (me.leftDown){
                        player.setVelocityX(-100);//LE PERSONNAGE VA A UNE VITESSE DE <A UNE VITESSE DE 260 A GAUCHE
                    }
                    else if (me.rightDown){
                        player.setVelocityX(100);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 260 A DROITE
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:
                    if (player.body.touching.down)
                    {
                        player.setVelocityY(-330);//LE JOUR VA A UNE VITESSE DE 330 VERS LE HAUT
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=true;
                    player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A DROITE

                    player.anims.play('right', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION RIGHT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=true;
                    player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 160 A GAUCHE

                    player.anims.play('left', true);//ET ON LUI DEMANDE DE LANCER L'ANIMATION LEFT QU'ON A CREE DANS LA FONCTION CREATE
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    if (me.leftDown){
                        player.setVelocityX(-160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 260 A GAUCHE
                    }
                    else if (me.rightDown){
                        player.setVelocityX(160);//LE PERSONNAGE VA A UNE VITESSE DE A UNE VITESSE DE 260 A GAUCHE
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.UP:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.rightDown=false;
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.leftDown=false;
                    player.setVelocityX(0);//LE PERSO NE BOUGE PAS

                    player.anims.play('turn');//ET ON JOUE L'ANIMATION TUR CREE DANS LA FONCTION CREATE

                    break;
            }
        });
    }
    update ()
    {

    }

}

