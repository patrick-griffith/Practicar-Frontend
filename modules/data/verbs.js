window.$invoke = require('~/modules/app')


export async function getVerb(spanish) {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/verbs/' + spanish
    )
}

export async function getQuestions(tenses) {

    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/questions?_with=verb,tense.mood,person&tenses_id-in=' + tenses + '&persons_id-in=1,2,3,4,6'
    )
}

export async function getMoods() {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/moods?_with=tenses&id-in=1,3'
    )
}

export async function getPersons() {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/persons'
    )
}