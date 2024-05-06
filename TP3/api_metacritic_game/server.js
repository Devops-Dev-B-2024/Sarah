const db = require('./models/indexModel')
const app = require('./app')
const bcrypt = require('bcrypt')
const { getIdRolesByNom } = require('./services/rolesService')

db.instance.sync({force: true}).then(async () => {
    console.log('Database connected and synchronized')
    app.listen(3000, () => {
        console.log('Server running on port 3000 !')
    })

    await db.roles.create({nom: "admin"})
    await db.roles.create({nom: "editor"})
    await db.roles.create({nom: "gamer"})

    await bcrypt.hash('admin_mdp', 10, async function(err, bcryptPassword){
        if(bcryptPassword){
            const role = await getIdRolesByNom("admin")
            await db.users.create({pseudo: 'admin', email: 'admin@gmail.com', hashedPassword: bcryptPassword, roles: role.id})
        }
    })
    bcrypt.hash('editor_mdp', 10, async function(err, bcryptPassword){
        if(bcryptPassword){
            const role = await getIdRolesByNom("editor")
            await db.users.create({pseudo: 'editor', email: 'editor@gmail.com', hashedPassword: bcryptPassword, roles: role.id})
        }
    })
    await fetch('http://localhost:3000/register/signUp', {
        method: "POST",
        body: JSON.stringify({ 
            pseudo: "gamer",
            email: "gamer@gmail.com",
            password: "gamer_mdp",
        }),
        headers: {'Content-Type': 'application/json'}
    })

    await db.criticsEditors.create({evaluation: "bien", note: 8, idEditor: 1})

    await db.reviews.create({avg: 9.8, description: "Take on the role of James Bond as played by Daniel Craig in all new SKYFALL levels. Unlock three new single player levels following the storyline of the SKYFALL movie. Levels take place in Istanbul and Shanghai as the player (Bond) attempts to track down ",title: "007 Legends: Skyfall", release: "2012/11/20",idCriticEditor: 1})

    await db.criticsUsers.create({idReview: 1, idUser: 3, comment: "Super jeu", note: 10})


}).catch((e) => {
    console.error(e)
})
