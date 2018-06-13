import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loggedInUser: '',
        chosenGrammarLevel: 1,
        lessonsThisSection: [],
        chosenGrammarPoint: [],
        bookmarkedGrammarPoint: null,
        usersBookmarkID: '',
        chosenVerb: '',
        chosenVerbParadigm: {},
    },
    getters: {
        currentUser: state => state.loggedInUser,
        currentGrammarLevel: state => state.chosenGrammarLevel,
        currentLessons: state => state.lessonsThisSection,
        currentGrammarPoint: state => state.chosenGrammarPoint,
        currentGrammarBookmark: state => state.bookmarkedGrammarPoint,
        currentUsersBookmarkID: state => state.usersBookmarkID,
        currentVerb: state => state.chosenVerb,
        currentVerbParadigm: state => state.chosenVerbParadigm,
    },
    mutations: {
        changeUserName(state, payload) {
            state.loggedInUser = payload;
        },
        changeGrammarLevel(state, payload) {
            state.chosenGrammarLevel = payload;
        },
        changeLessonsThisSection(state, payload) {
            state.lessonsThisSection = payload;
        },
        changeGrammarPoint(state, payload) {
            state.chosenGrammarPoint = payload;
        },
        setBookmarkedGrammarPoint(state, payload) {
            state.bookmarkedGrammarPoint = payload;
        },
        changeUsersBookmarkID(state, payload) {
            state.usersBookmarkID = payload
        },
        changeVerb(state, payload) {
            state.chosenVerb = payload;
        },
        changeVerbParadigm(state, payload) {
            state.chosenVerbParadigm = payload;
        }
    }
});

export default store;