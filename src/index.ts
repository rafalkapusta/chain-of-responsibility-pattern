import { Results } from './typed'

const fetchDataButton = document.getElementById('fetch_data_button')

const random = () => {
    return Math.floor(Math.random() * 4 + 1)
}

const results: Results = {
    '1': { data: ['data'], errors: [] },
    '2': { data: ['data'], errors: ['errors'] },
    '3': { data: null, errors: [] },
    '4': { data: null, errors: ['errors'] },
}

const handleClick = () => {
    setTimeout(() => {
        console.log(results[random() as keyof Results])
    }, 1500)
}

fetchDataButton.addEventListener('click', handleClick)
