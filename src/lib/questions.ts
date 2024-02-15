import { QuestionType, type Question } from "./types/Question";

export const questions: Question[] = [{
    question: "¿{user1} prefiere los días lluviosos o soleados?",
    type: QuestionType.choice,
    choices: [{
        text: "Lluviosos"
    }, {
        text: "Soleados"
    }],
}, {
    question: "¿A que tiene fobia {user1}?",
    type: QuestionType.input,
}, {
    question: "¿Es {user1} una persona supersticiosa?",
    type: QuestionType.boolean,
}, {
    question: "¿Cual es el color favorito de {user1}?",
    type: QuestionType.input
}, {
    question: "¿{user1} considera a {user2} un amigo?",
    type: QuestionType.boolean
}, {
    question: "¿A {user1} le gustaria tener hijos algun dia?",
    type: QuestionType.boolean
}, {
    question: "De este grupo, ¿Quien le cae peor a {user1}?",
    type: QuestionType.input
}, {
    question: "De este grupo, ¿Quien le parece mas gracios@ a {user1}?",
    type: QuestionType.input
}, {
    question: "De este grupo, ¿Con quien preferiria besarse {user1}?",
    type: QuestionType.input,
    confidenceLevel: 2,
}, {
    question: "¿Alguna vez {user2} ha echo llorar a {user1}?",
    type: QuestionType.boolean
}, {
    question: "¿A {user1} alguna vez te ha gustado la pareja de un amigo o amiga?",
    type: QuestionType.boolean
}, {
    question: "¿Quién cree {user1} que es la persona peor vestida del grupo?",
    type: QuestionType.input,
}, {
    question: "¿{user1} cree que {user2} viste bien?",
    type: QuestionType.boolean
}, {
    question: "Si {user1} tuviera que casarse con alguien de este grupo, ¿Con quien seria?",
    type: QuestionType.input
}, {
    question: "¿{user1} ha mandado nudes alguna vez?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} ha mandado nudes alguna vez a {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} ha mandado nudes alguna vez a alguien de este grupo?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} ha recibido nudes alguna vez?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} ha recibido nudes alguna vez de {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿Alguna vez han multado a {user1}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} alguna vez ha pillado a alguien haciéndolo?",
    type: QuestionType.boolean
}, {
    question: "Si las personas de este grupo estubieran en peligro, ¿A quien salvaria primero {user1}?",
    type: QuestionType.input
}, {
    question: "¿Alguna vez {user1} ha dudado de su sexualidad?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que la piña en la pizza es buena idea?",
    type: QuestionType.boolean
}, {
    question: "Si {user1} tuviera que matar a alguien de este grupo, ¿quien seria?",
    type: QuestionType.input
}, {
    question: "Si {user1} tuviera que hacerlo con alguien de este grupo, ¿quien seria?",
    type: QuestionType.input
}, {
    question: "Si {user1} tuviera que pegar a alguien de este grupo, ¿quien seria?",
    type: QuestionType.input
}, {
    question: "¿{user1} a practicado BDSM alguna vez?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} se ha tomado una foto o video durante el acto alguna vez?",
    type: QuestionType.boolean
}, {
    question: "¿del 1 al 10 que puntuacion le daria {user1} a {user2}?",
    type: QuestionType.input
}, {
    question: "¿del 1 al 10 que puntuacion le daria {user1} a {user2} sobre su vestimenta?",
    type: QuestionType.input
}, {
    question: "¿del 1 al 10 que puntuacion le daria {user1} a {user2} sobre su manera de ser?",
    type: QuestionType.input
}, {
    question: "¿{user1} le daria un beso a {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿Alguna vez {user1} ha pedido nudes a alguien?",
    type: QuestionType.boolean
}, {
    question: "¿Alguna vez {user1} ha pedido nudes a alguien?",
    type: QuestionType.input
}, {
    question: "¿{user1} seria capaz de tener una cita con {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿A {user1} le parece atractivo {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} le tiene envidia?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} es fe@?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} esta gord@?",
    type: QuestionType.boolean
}, {
    question: "Que prefiere {user1}. ¿Pasar un año a 40º o pasar un año a -10º?",
    type: QuestionType.choice,
    choices: [{
        text: "Un año a 40º",
    }, {
        text: "un año a -10º"
    }]
}, {
    question: "Que prefiere {user1}. ¿Comer una caca con sabor a pastel o un pastel con sabor a caca?",
    type: QuestionType.choice,
    choices: [{
        text: "caca con sabor a pastel",
    }, {
        text: "pastel con sabor a caca"
    }]
}, {
    question: "¿{user1} prefiere ir en zapatos o descalz@?",
    type: QuestionType.boolean
}, {
    question: "Si a {user1} le dieran un millón de euros por romper con su pareja. ¿Lo haria?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} ha visto porno alguna vez?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree en el destino?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree en las señales del universo?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} es toxic@?",
    type: QuestionType.boolean
}, {
    question: "¿A {user1} le han sido infiel alguna vez?",
    type: QuestionType.boolean
}, {
    question: "¿A {user1} le gusta su nombre?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} se considera una persona feliz?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} es una persona feliz?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} le dejaria su movil a {user2} por 20 minutos?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} le dejaria su coche a {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} ha tenido alguna vez un accidente de coche?",
    type: QuestionType.boolean
}, {
    question: "¿A quien quiere mas {user1}?",
    type: QuestionType.choice,
    choices: [{
        text: "A su madre",
    }, {
        text: "A su padre"
    }]
}, {
    question: "¿{user1} es mas de series o peliculas?",
    type: QuestionType.choice,
    choices: [{
        text: "Series",
    }, {
        text: "Peliculas"
    }]
}, {
    question: "¿A quien quiere mas {user1}?",
    type: QuestionType.choice,
    choices: [{
        text: "A su madre",
    }, {
        text: "A su padre"
    }, {
        text: "A su herman@"
    }]
}, {
    question: "¿{user2} conoce algo de {user1} que nadie mas de aqui sepa?",
    type: QuestionType.boolean
}, {
    question: "¿con quien de este grupo confia menos {user1}?",
    type: QuestionType.input
}, {
    question: "¿con quien de este grupo confia mas {user1}?",
    type: QuestionType.input
}, {
    question: "¿{user1} confiaria ciegamente en {user2}?",
    type: QuestionType.input
}, {
    question: "¿{user1} cree que a {user2} le huelen mal los pies?",
    type: QuestionType.boolean
}, {
    question: "si {user1} pudiera elegir, ¿A que edad le gustaria morir?",
    type: QuestionType.input
}, {
    question: "¿{user1} prefiere dormir con ropa o desnud@?",
    type: QuestionType.choice,
    choices: [{
        text: "Con ropa",
    }, {
        text: "Sin ropa"
    }]
}, {
    question: "¿{user1} reportaria a la policia si supiera que {user2} cometio un crimen?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} alguna vez se peleo con {user2}?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} dejaria que {user2} le hiciera un tatoo?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} dejaria que {user2} decidiera que tatoo dibujarse sin saberlo?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} cree en el amor?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} cree que se casara algun dia?",
    type: QuestionType.boolean,
}, {
    question: "si {user2} tuviera que cocinar la comida que peor se le de, ¿{user1} la provaria?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} alguna vez ha mentido en un juego como este?",
    type: QuestionType.boolean,
}, {
    question: "¿{user1} dormiria con {user2} si pudiese?",
    type: QuestionType.boolean,
}, {
    question: "Pregunta de intuicion. ¿De que color lleva la ropa interior {user1} hoy?",
    type: QuestionType.input
}, {
    question: "¿Que dia de la semana le gusta mas a {user1}?",
    type: QuestionType.input
}, {
    question: "¿{user2} seria capaz de robarle un beso a {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿Que color le gusta menos a {user1}?",
    type: QuestionType.input
}, {
    question: "¿{user1} cree que {user2} y {user3} hacen buena pareja?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} y {user3} nunca podran llevarse bien?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} es celoso?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} es dramatico?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} cree que {user2} podria salir con {user3}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} se saltaria una classe por pasar tiempo con {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} dejaria que {user2} le lleve a caballito?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} conoce de memoria el numero de telefono de su madre?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} aceptaria ser el/la novi@ de {user2} por un dia?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} saldria con alguien mas alto que el/ella?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} estaria dispuesto a adoptar y cuidar una mascota junto a {user2}?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} estaria dispuesto a viajar a solas con {user2} y {user3}?",
    type: QuestionType.boolean
}, {
    question: "¿Quien elegiria {user1} para recibir un regalo?",
    type: QuestionType.input
}, {
    question: "¿A {user1} para recibir un regalo?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} seria capaz de llevar una foto de {user2} en la cartera?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} seria capaz de llevar una foto de {user2} en la funda del movil?",
    type: QuestionType.boolean
}, {
    question: "¿{user1} seria capaz de ponerse una foto de perfil junto a {user2}?",
    type: QuestionType.boolean
}];