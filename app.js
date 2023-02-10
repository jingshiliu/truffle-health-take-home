const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const port = process.env.PORT || 3000

const database = { bills: [] }

/**
 * Assume the medical bill is in req.body.medicalBill
 */
app.post('/items', (req, res) => {
    const { medicalBill } = req.body

    if (!isValidBill(medicalBill)) {
        res.status(400).json({
            message: 'Medical bill format not allowed',
            medicalBill
        })
    } else {
        database.bills.push(medicalBill)
        res.status(200).json({
            message: 'Created'
        })
    }
})

app.get('/items', (req, res) => {
    res.status(200).json(database.bills)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


//---------------- util function ---------------------


function isValidBill(medicalBill) {
    if (!medicalBill) return false

    const medicalBillProperties = [
        'patientName',
        'address',
        'hospital',
        'billAmount'
    ]

    let isValid = true
    for (const property of medicalBillProperties) {
        if (!(property in medicalBill)) {
            isValid = false
            break
        }
    }
    return isValid
}