<template>
  <v-container fluid text-xs-center id='lesson' >
    <v-layout row>
      <v-flex id='lesson-header' xs12>
        <h1 class='display-3'>{{ $store.state.chosenGrammarPoint[2] }}</h1>
      </v-flex>
    </v-layout>
	<!-- This content is interchangeable -->
		<app-loader v-if='loading'></app-loader>
    <v-layout row v-if='layoutType === "p"' wrap>
		<v-flex md6>
			<div class='lesson-commentary' v-html='this.commentary'>
			</div>
		</v-flex>
		<v-flex md6>
			<div class='lesson-examples'>
				<v-alert class='example-alert' v-for='example in this.examples' :key='example[0]' color="yellow" value='true'><b>{{ example[1] }}</b><br/>{{ example[2] }}</v-alert>
			</div>
		</v-flex>
	</v-layout>
	<div v-else-if='layoutType === "l"'>
		<v-layout row>
			<v-flex xs12>
				<div class='lesson-commentary' v-html='this.commentary'>
				</div>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<div class='lesson-examples'>
					<v-alert class='example-alert' v-for='example in this.examples' :key='example[0]' color="yellow" value='true'><b>{{ example[1] }}</b><br/>{{ example[2] }}</v-alert>
				</div>
			</v-flex>
		</v-layout>
	</div>
	<v-layout v-else row>
		<v-flex xs12>
			<div class='lesson-commentary' v-html='this.commentary'>
			</div>
		</v-flex>
	</v-layout>
	<!-- End of interchangeable content -->
	<v-layout row>
		<v-flex xs12 id='lesson-buttons'>
			<v-btn v-if='$store.state.chosenGrammarPoint[0] !== 0' class='yellow--text' color="red" @click='goToPreviousLesson'>Previous lesson</v-btn>
			<v-btn class='yellow--text' color="red" to='/lessons'>Back to lesson section</v-btn>
			<v-btn v-if='$store.state.chosenGrammarPoint[0] !== 84' class='yellow--text' color="red" @click='goToNextLesson'>Next Lesson</v-btn>
			<v-btn v-if='$store.state.loggedInUser !== ""' class='yellow--text' color="red" @click='setBookmark'>{{ this.$store.state.bookmarkedGrammarPoint === this.$store.state.chosenGrammarPoint[0] ? 'This grammar point is bookmarked' : 'Bookmark this grammar point' }}</v-btn>
		</v-flex>
	</v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import Loader from './Loader';

export default {
	name: 'Lesson',
	data() {
		return {
			startIdThisLesson: Number,
			endIdThisLesson: Number,
			layoutType: 'p',
			commentary: '',
			example: [],
			examples: [],
			authToken: '',
			loading: false,
			newGrammarPoint: [],
		}
	},
	computed: {
			...mapGetters(
				[
					'loggedInUser',
					'currentGrammarLevel',
					'currentGrammarPoint'
				]
			),
      grammarPoint() {
        return this.$store.state.chosenGrammarPoint;
      },
			usersBookmarkID() {
				return this.$store.state.usersBookmarkID;
			},
      grammarBookmark() {
        return this.$store.state.bookmarkedGrammarPoint;
      }
    },
	components: {
      appLoader: Loader
    },
	methods: {
		getCommentaryAndExample(layoutType, commentaryID, lessonNumber) {
				this.loading = true;
				this.layoutType = layoutType;
				this.$http.get(`https://pastebin.com/raw/${commentaryID}`).then((response) => {
					this.commentary = response.body;
				});
				this.$http.get(`https://v-va-pmm.firebaseio.com/sentences.json?orderBy="lesson"&equalTo=${lessonNumber}`)
					.then((response) => {
						this.examples = [];
						this.startIdThisLesson = +Object.keys(response.body)[0];
						this.endIdThisLesson = this.startIdThisLesson + (Object.keys(response.body).length - 1);
						for (let i = this.startIdThisLesson; i <= this.endIdThisLesson; i += 1) {
							const exampleSpanish = response.body[i].es;
							const exampleEnglish = response.body[i].en;
							const exampleLesson = response.body[i].lesson;
							this.example = [
								i,
								exampleSpanish,
								exampleEnglish,
								exampleLesson
							];
							this.examples.push(this.example);
						}
				});
				this.loading = false;
			},
		setBookmark() {
		const bookmarkData = {
			user: this.$store.state.loggedInUser,
			bookmark: this.$store.state.chosenGrammarPoint[0]
		}
		firebase.auth().currentUser.getIdToken().then((idToken) => {
			if (this.$store.state.bookmarkedGrammarPoint !== null) {
				this.$store.commit('setBookmarkedGrammarPoint', this.$store.state.chosenGrammarPoint[0]);
				// if the user has a bookmark - update it
				this.$http.put(`https://v-va-pmm.firebaseio.com/bookmarks/${this.$store.state.usersBookmarkID}.json?auth=${idToken}`, bookmarkData).then((response) => {
					alert(`Bookmark updated to Lesson No. ${response.body.bookmark}: ${this.$store.state.chosenGrammarPoint[2]}`);
				});
			} else {
			this.$store.commit('setBookmarkedGrammarPoint', this.$store.state.chosenGrammarPoint[0]);
			// if the user doesn't have a bookmark - create one
			this.$http.post(`https://v-va-pmm.firebaseio.com/bookmarks.json?auth=${idToken}`, bookmarkData).then((response) => {
				this.$store.commit('changeUsersBookmarkID', response.body.name);
			});
			}
		},
			(err) => {
			console.log(err.message);
			}
		);
		},
		changeLesson(newLessonNumber) {
			this.$http.get(`https://v-va-pmm.firebaseio.com/grammar/${newLessonNumber}.json`).then((response) => {
					const commentaryID = response.body.commentary;
					const grammarPointName = response.body.grammarpoint;
					const layout = response.body.layout;
					const sectionThisLesson = response.body.section
					this.newGrammarPoint = [
						newLessonNumber,
						commentaryID,
						grammarPointName,
						layout,
						sectionThisLesson
					];
					this.$store.commit('changeGrammarPoint', this.newGrammarPoint);
					if (this.newGrammarPoint[4] !== this.$store.getters.currentGrammarLevel) {
						this.$store.commit('changeGrammarLevel', this.newGrammarPoint[4]);
					}
					this.getCommentaryAndExample(
						this.newGrammarPoint[3],
						this.newGrammarPoint[1],
						this.newGrammarPoint[0]
					);
			});
		},
		goToPreviousLesson() {
			this.changeLesson(this.$store.state.chosenGrammarPoint[0] - 1);
		},
		goToNextLesson() {
			this.changeLesson(this.$store.state.chosenGrammarPoint[0] + 1);
		}
	},
    mounted() {
      this.getCommentaryAndExample(
				this.$store.state.chosenGrammarPoint[3],
				this.$store.state.chosenGrammarPoint[1],
				this.$store.state.chosenGrammarPoint[0]
			);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#lesson {
		background-image: url('../assets/images/colombia.jpg');
		background-size: cover;
		background-position: fixed;
		min-height: 85.75vh;
		color: yellow;
	}

	h1 {
		text-shadow: 2px 2px 2px black;
		font-weight: 800;
	}

	#lesson-header {
		margin-bottom: 25px;
	}

	.lesson-commentary,
	.lesson-examples {
		background-color: rgba(244, 67, 54, 0.85);
		height: 100%;
		padding: 10px;
		margin-bottom: 25px;
		text-align: left;
	}

	.lesson-commentary {
		font-size: 18px;
	}

	#lesson-buttons {
		text-align: center;
	}

	.example-alert {
		width: fit-content;
		font-size: 12px;
		float: left;
		color: darkred;
		text-align: center;
		padding: 5px;
		margin: 5px;
	}

</style>
