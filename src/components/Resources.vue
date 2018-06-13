<template>
  <v-container fluid text-xs-center id='resources' >
    <v-layout row>
      <v-flex id='resources-header' xs12>
        <h1 class='display-3'>Resources</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
		<v-flex xs12>
			<div class='resources-subheader'>
				<p>Here are some other resources you may find useful.</p>
			</div>
      </v-flex>
    </v-layout>
    <v-layout row>
		<v-flex xs12>
			<div class='resources-panel'>
				<v-btn block to='/verbtables' class='red darken-3 yellow--text'><h3>Verb Tables</h3></v-btn>
				<v-btn block disabled class='red darken-3 yellow--text'><h3>Pronunciation</h3></v-btn>
				<v-btn block disabled class='red darken-3 yellow--text'><h3>Useful links</h3></v-btn>
			</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	name: 'Resources'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#resources {
		background-image: url('../assets/images/mexicocity.jpg');
		background-size: cover;
		background-position: fixed;
		min-height: 85.75vh;
		color: yellow;
	}

	h1 {
		text-shadow: 2px 2px 2px black;
		font-weight: 800;
	}

	#resources-header {
		margin-bottom: 25px;
	}

	.resources-subheader,
	.resources-panel {
		background-color: rgba(244, 67, 54, 0.85);
		padding: 10px;
		margin-bottom: 25px;
		text-align: center;
	}

	p {
		font-size: 18px;
	}

</style>
