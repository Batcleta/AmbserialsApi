module.exports = app => {
    const AmbiClient = require("../controller/controller")
    const router = require("express").Router()

    // // Create a new Tutorial
    router.post("/", AmbiClient.create)

    // Retrieve all Tutorials
    router.get("/", AmbiClient.findAll)

    // // Retrieve a single Tutorial with id
    router.get("/edit", AmbiClient.findOne)

    // // Update a Tutorial with id
    router.put("/edit", AmbiClient.update)

    // // Delete a Tutorial with id
    router.delete("/delete", AmbiClient.delete)

    // // Delete all Tutorials
    // router.delete("/", AmbiClient.deleteAll)

    app.use('/api/Ambclients', router)

}
