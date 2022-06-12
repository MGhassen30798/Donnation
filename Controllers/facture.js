const Facture = require('../Models/factureModels');









//create facture
exports.createFacture = async(req, res) => {
    const facture = new Facture({
        refArticle: req.body.refArticle,
        refuser: req.body.refuser,
        refAss: req.body.refAss,
        refCash: req.body.refCash,
        name: req.body.name,
        price: req.body.price,
        qte: req.body.qte,
    });
    await facture.save()
        .then(() => res.status(201).json({ message: 'Facture saved !' }))
        .catch(error => res.status(400).json({ message: 'Facture not saved !' }));


    const array = await User.User.findOne({ refuser: req.body.refuser })

    array.forEach(element => {

        element.wallet = element.wallet + 1
    });
    console.log(element.wallet);
}

//get facture by id
exports.getFacturesbyid = (req, res, next) => {
    Facture.findOne({ _id: req.params.id })
        .then(facture => res.status(200).json(facture))
        .catch(error => res.status(404).json({ message: "Facture not found Check id " }));
}

//get all facture by user
exports.getAllFactureByUser = async(req, res, next) => {
    var facturaat = []
    try {
        const F = await Facture.find({ refuser: req.params.refuser })
        if (F.length > 0) {
            for (i = 0; i < F.length; i++) {
                if (F[i].show) {
                    facturaat.push(F[i])
                }
            }
            res.status(200).json({ factures: facturaat })
        } else {
            res.status(300).json({ message: "nothing to show in here" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//delete facture
exports.deleteFacture = (req, res, next) => {
    Facture.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Facture deleted !' }))
        .catch(error => res.status(400).json({ message: "Check id" }));
}

//delete facture by user and article
exports.deleteFacture = (req, res, next) => {
    Facture.deleteOne({ _id: req.params.id, refuser: req.params.refuser })
        .then(() => res.status(200).json({ message: 'Facture deleted !' }))
        .catch(error => res.status(400).json({ message: "Check id" }));
}