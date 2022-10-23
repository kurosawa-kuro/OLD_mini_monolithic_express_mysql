// const { Op } = require("sequelize");
// const db = require("../../db/models/index")
const { Sample } = require("../../db/models/index")

async function startSample() {
    console.log("startSample")
    // console.log({ Sample })

    // createAction()
    readSamples()
    // readSample2()
    // readSample()
    // searchSample()
    // updateAction()
    // deleteAction()
    // truncateSamples()
}

const createAction = async () => {
    console.log("start createAction")
    try {
        // const body = req.body
        const req = {
            body: {
                name: "abc",
                created_at: new Date(),
                updated_at: new Date(),
            }
        }

        const sample = await Sample.create(req.body)
        // console.log("sample", JSON.stringify(sample, null, 2))

        const data = sample
        const msg = "Successfully created Sample"

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readSamples = async () => {
    console.log("start readSample")
    try {
        const samples = await Sample.findAll()
        console.log("sample", JSON.stringify(samples, null, 2))

        const data = samples
        const msg = data.length !== 0 ? "Successfully read Samples" : "Successfully read Samples but empty"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readSample = async () => {
    console.log("start readSample")
    try {
        const sample = await Sample.findByPk(1)
        console.log("sample", JSON.stringify(sample, null, 2))

        const data = sample
        const msg = data.length !== 0 ? "Successfully read Samples" : "Successfully read Samples but empty"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readSample2 = async () => {
    console.log("start readSample2")
    try {
        const sample = await db.Sample.findByPk(1)
        // console.log("sample", JSON.stringify(sample, null, 2))
        // console.log({ sample })

        const aaaa = sample.aaaa()
        console.log({ aaaa })

        // return res.status(200).json({ isSuccess: true, msg, data })
        // console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readSample3 = async () => {
    console.log("start readSample3")
    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM samples");
        // console.log("samples metadata", JSON.stringify(metadata, null, 2))
        const msg = "Successfully read Samples"
        const data = metadata

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const updateAction = async () => {
    console.log("start updateAction")
    try {
        // const id = req.params.id
        const id = 2

        // const body = req.body
        const body = {
            name: "updated name",
        }

        const foundSampleWithId = await Sample.findByPk(id);
        // console.log({ foundSampleWithId })

        if (!foundSampleWithId) {
            // res.statusCode = 404
            throw new Error('sample not found');
        }

        await Sample.update(body, {
            where: { id }
        });

        foundSampleWithId.name = body.name
        foundSampleWithId.role = body.role

        const msg = "Successfully updated Sample"
        const data = foundSampleWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const deleteAction = async () => {
    console.log("start deleteAction")
    try {
        // const id = req.params.id
        const id = 1

        const foundSampleWithId = await Sample.findByPk(id);
        // console.log({ foundSampleWithId })

        if (!foundSampleWithId) {
            // res.statusCode = 404
            throw new Error('Sample not found');
        }

        await Sample.destroy({
            where: { id }
        });
        const msg = "Successfully deleted Sample"
        const data = foundSampleWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const searchSamples = async () => {
    console.log("start searchSamples")
    try {
        // const { keyword } = req.query
        const keyword = "Doe"

        const samples = await Sample.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    }
                ]
            }
        })

        const data = samples
        const msg = samples.length === 0 ? "Successfully searched Samples but empty" : "Successfully searched Samples"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const truncateSamples = async () => {
    console.log("start truncateSamples")

    try {
        await Sample.destroy({
            truncate: true
        });

        const data = []
        const msg = "Successfully truncate Samples"

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startSample
}

