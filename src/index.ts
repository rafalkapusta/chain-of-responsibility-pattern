import { Results } from './typed'
import { FakeResponse, Success, Warning, Error, CriticalError } from './models'

const fetchDataButton = document.getElementById('fetch_data_button')

const random = () => {
    return Math.floor(Math.random() * 4 + 1)
}

const results: Results = {
    '1': { data: ['data'], errors: [] },
    '2': { data: null, errors: [] },
    '3': { data: ['data'], errors: ['errors'] },
    '4': { data: null, errors: ['errors'] },
}

const handleClick = () => {
    return new Promise((resolve) =>
        setTimeout(() => resolve(random()), 500)
    ).then((r) => {
        console.log(r)
        console.log(new FakeResponse(results[r as keyof Results]))
        criticalError.handleResponse(
            new FakeResponse(results[r as keyof Results])
        )
    })
}

const success = new Success()
const warning = new Warning()
const error = new Error()
const criticalError = new CriticalError()

criticalError.setNextHandler(error)
error.setNextHandler(warning)
warning.setNextHandler(success)

fetchDataButton.addEventListener('click', handleClick)
