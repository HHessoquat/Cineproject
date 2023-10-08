import thelmaLouise from '../img/posters/Thelma-Louise.jpg';
export const movie = {
    _id: 'autoGenerate',
    title: 'Thelma et Louise',
    poster: thelmaLouise,
    posterAlt: 'affiche du film Thelma et Louise',
    releaseDate: new Date('1991-05-29'),
    length: 129,
    director: 'Ridley Scott',
    mainActors: [
        'Susan Sarrendon',
        'Geena Davis',
        'Harvey Keitel',
        'Brad Pitt',
    ],
    synopsis:
        "Thelma Lauren Dickinson, la trentaine, est l'épouse au foyer frustrée et soumise de Darryl, archétype du macho d'autant plus parfaitement inconscient de son ridicule2 que son complexe de supériorité est renforcé par sa réussite professionnelle. Louise Elizabeth Sawyer, son amie, serveuse dans une cafétéria, l'a convaincue de s'évader pour un week-end à la montagne. Quittant l'Arkansas, elles sont bien décidées à profiter de ces heures de liberté. Elles s'arrêtent en cours de route, dans une boîte de nuit. Alors qu'un homme essaie de violer Thelma sur le parking, Louise arrive in extremis, sort un revolver et empêche le viol. Devant la vulgarité et l'agressivité de l'homme, elle le tue. Louise refuse catégoriquement de se rendre à la police et décide de prendre la direction du Mexique, entraînant Thelma dans sa cavale.",
    trailer: 'https://www.youtube.com/watch?v=2iBFmKlO4BY',
    pg: 'tout public',
    warning: ['violences sexuelles', 'violences', 'suicide'],
    categories: ['Road Trip', 'drame'],
};
