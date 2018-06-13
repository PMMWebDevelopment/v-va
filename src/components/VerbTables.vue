<template>
	<v-container fluid text-xs-center id='verbtables' >
		<v-layout row>
			<v-flex id='verbtables-header' xs12>
				<h1 class='display-2'>Verb Tables</h1>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<div class='verbtables-subheader'>
					<p>Choose a verb from the dropdown menu to see how it works in different tenses and moods.</p>
				</div>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<div class='verbtables-panel'>
					<v-layout row wrap>
						<v-flex lg2 class='verb-selector'>
							<v-menu light left max-width='80vw' max-height='300px' :nudge-bottom=45>
								<v-btn id='verb-list-button' slot='activator' color='yellow' dark>Verb List</v-btn>
								<v-list>
									<v-list-tile v-for='(verb, i) in verbList' :key='i'>
									<v-list-tile-title class='red--text' @click='selectVerb(verb[1])'><i><b>{{ verb[1] }}</b></i> - {{ verb[2] }}</v-list-tile-title>
									</v-list-tile>
								</v-list>
							</v-menu>
						</v-flex>
						<v-flex lg10>
							<div v-if='verbChosen'>
								<h2><i>{{ $store.state.chosenVerb }}</i> - {{ $store.state.chosenVerbParadigm.en }}</h2>
								<p>Gerund: <i><b>{{ $store.state.chosenVerbParadigm.gerund }}</b></i> | Participle: <i><b>{{ $store.state.chosenVerbParadigm.participle }}</b></i></p>
							</div>
						</v-flex>
					</v-layout>
					<v-layout v-if='verbChosen' row wrap>
						<v-flex lg2 class='verb-selector'>
							<v-menu light left max-width='80vw' max-height='250px' :nudge-bottom=45>
								<v-btn id='verb-list-button' slot='activator' color='yellow' dark>Tenses &amp; Moods</v-btn>
								<v-list>
									<v-list-tile v-for='tense in tenses' :key='tense[0]'>
									<v-list-tile-title class='red--text' @click='selectTense(tense[0], tense[1])'>{{ tense[1] }}</v-list-tile-title>
									</v-list-tile>
								</v-list>
							</v-menu>
							<div v-if='tenseChosen'>
								<p>Chosen tense / mood: -</p>
								<h2>{{ chosenTenseName }}</h2>
							</div>
						</v-flex>
						<v-flex class='tense-breakdown' v-if='tenseChosen' lg10>
							<table >
								<tbody>
									<tr><td class='persons'>yo</td><td class='verb-form'><b>{{ this.chosenTenseBreakdown.yo }}</b></td></tr>
									<tr><td class='persons'>tú</td><td class='verb-form'><b>{{ this.chosenTenseBreakdown.tu }}</b></td></tr>
									<tr><td class='persons'>él/ella/ello/usted</td><td class='verb-form'><b>{{ this.chosenTenseBreakdown.el }}</b></td></tr>
									<tr><td class='persons'>nosotros</td><td class='verb-form'><b>{{ this.chosenTenseBreakdown.ns }}</b></td></tr>
									<tr><td class='persons'>vosotros</td><td class='verb-form'><b>{{ this.chosenTenseBreakdown.vs }}</b></td></tr>
									<tr><td class='persons'>ellos/ellas/ustedes</td><td class='verb-form'><b>{{ this.chosenTenseBreakdown.ellos }}</b></td></tr>
								</tbody>
							</table>
						</v-flex>
					</v-layout>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		name: 'VerbTables',
		data() {
			return {
				verb: [],
				verbList: [],
				verbChosen: false,
				tenses: [
					['pres', 'Present'],
					['fut', 'Future'],
					['cond', 'Conditional'],
					['imperf', 'Imperfect'],
					['pret', 'Simple Past'],
					['futperf', 'Future Perfect'],
					['condperf', 'Conditional Perfect'],
					['pluperf', 'Pluperfect'],
					['pretant', 'Past Anterior'],
					['pretperf', 'Past Perfect'],
					['imp', 'Imperative Positive'],
					['impdont', 'Imperative Negative'],
					['presprog', 'Present Progressive'],
					['subpres', 'Present Subjunctive'],
					['subfut', 'Future Subjunctive'],
					['subimperfrform', 'Imperfect Subjunctive (R-form)'],
					['subimperfsform', 'Imperfect Subjunctive (S-form)'],
					['subfutperf', 'Future Perfect Subjunctive'],
					['subpluperfrform', 'Pluperfect Subjunctive (R-form)'],
					['subpluperfsform', 'Pluperfect Subjunctive (S-form)'],
					['subpretperf', 'Past Perfect Subjunctive']
				],
				chosenTense: '',
				tenseChosen: false,
				chosenTenseName: '',
				chosenTenseBreakdown: {}
			}
		},
		methods: {
			fetchVerbList() {
				this.$http.get('https://v-va-pmm.firebaseio.com/verbs.json').then((response) => {
					for (let i = 0; i < Object.keys(response.data).length; i += 1) {
						const verbName = response.data[i].verb;
						const verbEnglish = response.data[i].en;
						this.verb = [
							i,
							verbName,
							verbEnglish
						];
						this.verbList.push(this.verb);
					}
				});
			},
			selectVerb(verb) {
				this.$store.commit('changeVerb', verb);
				this.$http.get(`https://pmmweb-spanish-verbs.firebaseio.com/${verb}.json`).then((response) => {
					this.$store.commit('changeVerbParadigm', response.data);
					this.verbChosen = true;
				})
			},
			selectTense(tenseAbbrev, tenseName) {
				Object.keys(this.$store.state.chosenVerbParadigm).forEach((key) => {
					if (tenseAbbrev === key) {
						this.chosenTense = tenseAbbrev;
						this.chosenTenseName = tenseName;
						this.chosenTenseBreakdown = this.$store.state.chosenVerbParadigm[key];
					}
				});
				this.tenseChosen = true;
				console.log(this.chosenTenseBreakdown);
			}
		},
		created() {
			this.fetchVerbList();
		}
	}
</script>

<style scoped>
	#verbtables {
		background-image: url('../assets/images/cuba.jpg');
		background-size: cover;
		background-position: fixed;
		min-height: 85.75vh;
		color: yellow;
	}

	h1 {
		text-shadow: 2px 2px 2px black;
		font-weight: 800;
	}

	#verbtables-header {
		margin-bottom: 10px;
	}

	.verbtables-subheader,
	.verbtables-panel {
		background-color: rgba(244, 67, 54, 0.85);
		padding: 10px;
		margin-bottom: 10px;
		text-align: center;
	}

	.verbtables-panel {
		min-height: 59vh;
	}

	p {
		font-size: 18px;
	}

	.verb-selector {
		text-align: left;
	}

	#verb-list-button {
		color: darkred;
	}

	.red--text {
		cursor: pointer;
	}

	.tense-breakdown {
		font-style: italic;
		padding-left: 50px;
		font-size: 24px;
	}

	.persons {
		text-align: right;
	}

	.verb-form {
		padding-left: 20px;
		text-align: left;
	}

	@media (max-width: 500px) {

		.tense-breakdown {
			font-size: 18px;
		}

		p {
			font-size: 16px;
		}

	}


</style>