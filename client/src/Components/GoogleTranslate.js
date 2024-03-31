import axios from "axios";

const API_KEY = "AIzaSyCd2LzbLKlVEp8WH5ntDBiJKiU4Y52p1nA"
const API_URL = "https://translation.googleapis.com/language/translate/v2"

const translateText = async (text, targetLanguage) => {
    const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
            q: text,
            target: targetLanguage,
        }
    )
    return response.data.data.translations[0].translatedText
}

export default translateText