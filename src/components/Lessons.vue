<template>
  <v-container fluid text-xs-center id='lessons' >
    <v-layout row>
      <v-flex id='lessons-header' xs12>
        <h1 class='display-3'>Lessons</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
		<v-flex xs12>
			<div class='lessons-subheader'>
				<p>Here, you can access the three lesson sections. What is discussed in each section rises in complexity the higher the number. Click on one of the boxes below to access the individual bite-size grammar lessons (although it's a good idea to start at Section 1).</p>
			</div>
      </v-flex>
    </v-layout>
    <v-layout row>
		<v-flex xs12>
			<div class='lessons-panel'>
				<app-loader v-if='loading'></app-loader>
				<v-btn v-for='(grammarPoint, index) in this.grammarPointsThisLevel' :key='index' to='/lesson' class='red darken-3 yellow--text' @click='handleLessonChoice(grammarPoint)'><h3>{{ grammarPoint[2] }} </h3>
					<v-badge v-if="$store.state.bookmarkedGrammarPoint === grammarPoint[0]" color="yellow">
						<i class="fas fa-bookmark"></i>
					</v-badge>
				</v-btn>
			</div>
      </v-flex>
    </v-layout>
	<v-layout row>
		<v-flex xs6 offset-xs3>
			<div id='pagination'>
				<v-radio-group id="radio-group" v-model='radioSelected' row>
					<v-radio v-for='i in 3' :key='i' :label="`Section ${i}`" :value="i" @change='changeLevel(i)'></v-radio>
			</v-radio-group>
			<span v-if='$store.state.bookmarkedGrammarPoint !== null' id='bookmarked'><i class="fas fa-bookmark"></i> = bookmarked</span>
			</div>
		</v-flex>
	</v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
	import Loader from './Loader';

	export default {
		name: 'Lessons',
		computed: {
			...mapGetters(
				[
					'currentGrammarLevel',
					'currentGrammarPoint',
				]
			),
			grammarBookmark() {
				return this.$store.state.bookmarkedGrammarPoint;
			},
		},
		data() {
			return {
				radioSelected: this.$store.state.chosenGrammarLevel,
				startIdThisLevel: Number,
        endIdThisLevel: Number,
				grammarPointsThisLevel: [],
				grammarPoint: [],
				loading: false
			}
		},
		components: {
      appLoader: Loader
    },
		created() {
      this.getGrammarPoints(this.$store.state.chosenGrammarLevel);
		},
		methods: {
      changeLevel(page) {
        this.loading = true;
				this.$store.commit('changeGrammarLevel', page);
				this.chosenGrammarLevel = page;
				this.grammarPointsThisLevel = [];
				this.getGrammarPoints(page);
				this.loading = false;
      },
      getGrammarPoints(page) {
        this.loading = true;
        this.$http.get(`https://v-va-pmm.firebaseio.com/grammar.json?orderBy="section"&equalTo=${page}`).then((response) => {
					this.startIdThisLevel = +Object.keys(response.body)[0];
					this.endIdThisLevel = this.startIdThisLevel + (Object.keys(response.body).length - 1);
					for (let i = this.startIdThisLevel; i <= this.endIdThisLevel; i += 1) {
						const commentaryID = response.body[i].commentary;
						const grammarPointName = response.body[i].grammarpoint;
						const layout = response.body[i].layout;
						const sectionThisLesson = response.body[i].section
						this.grammarPoint = [
							i,
							commentaryID,
							grammarPointName,
							layout,
							sectionThisLesson
						];
						this.grammarPointsThisLevel.push(this.grammarPoint);
						this.$store.commit('changeLessonsThisSection', this.grammarPointsThisLevel);
					}
          this.loading = false;
        });
			},
			handleLessonChoice(grammarPoint) {
        this.$store.commit('changeGrammarPoint', grammarPoint);
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#lessons {
		background-image: url('../assets/images/windmill.jpg');
		background-size: cover;
		background-position: fixed;
		min-height: 85.75vh;
		color: yellow;
	}

	h1 {
		text-shadow: 2px 2px 2px black;
		font-weight: 800;
	}

	#lessons-header {
		margin-bottom: 25px;
	}

	.lessons-subheader,
	.lessons-panel {
		background-color: rgba(244, 67, 54, 0.85);
		padding: 10px;
		margin-bottom: 25px;
	}

	.lessons-subheader {
		text-align: left;
	}

	.lessons-panel {
		text-align: center;
	}

	p {
		font-size: 18px;
	}

	#pagination {
		background-color: rgba(0, 0, 0, 0.5);
	}

	#radio-group {
		padding-left: 30px;
	}

	#bookmarked {
    margin-top: 15px;
    margin-left: 10px;
    background-color: rgba(255, 0, 0, 0.25);
    color: yellow;
    font-weight: bold;
  }

	v-badge {
		margin-left: 5px;
	}

</style>
