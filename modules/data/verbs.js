window.$invoke = require('~/modules/app')


export async function getVerb(spanish) {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/verbs/' + spanish
    )
}

export async function getQuestions() {
    return await $invoke._invoker(
        'get',
        process.env.baseApiUrl + '/questions?tenses_id-in=1,2,3&persons_id-in=1,2,3,4,6'
    )
}