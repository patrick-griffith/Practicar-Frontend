window.$invoke = require('~/modules/app')


export async function getVerb(spanish) {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/verbs/' + spanish,
        {},{},false
    )
}

export async function getAnswers() {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/answers/me?_with=conjugation&_sort=-created_at&_limit=50'        
    )
}

export async function recordAnswer(formData) {
    return await $invoke._invoker(
        'post',
        process.env.baseApiUrl + '/answers',
        formData
    )
}

export async function getQuestions(tenses, persons, regulars, singleVerb) {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/questions?_with=verb,tense.mood,person&tenses_id-in=' + tenses + '&persons_id-in=' + persons + '&is_irregular-in=' + regulars + (singleVerb && singleVerb.id ? ('&verbs_id=' + singleVerb.id) : ''),
        {},{},false
    )
}

export async function getMoods() {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/moods?_with=tenses&id-in=1,3,4,5',
        {},{},false
    )
}

export async function getPersons() {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/persons',
        {},{},false
    )
}