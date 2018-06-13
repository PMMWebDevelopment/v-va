<template>
	<v-toolbar dark color='red'>
    <v-toolbar-title class="yellow--text hidden-xs-and-down"><span @click='goHome'>¡V-VA!</span></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class="yellow--text" to='/lessons' flat>Lessons</v-btn>
      <v-btn class="yellow--text" to='/resources' flat>Resources</v-btn>
      <v-btn v-if='$store.state.loggedInUser === ""' class="yellow--text" to='/signuplogin' flat>Sign up / Log in</v-btn>
      <v-btn v-else @click='logout' class="yellow--text" flat>Log out: {{ $store.state.loggedInUser }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import firebase from 'firebase';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Header',
    computed: {
      ...mapGetters(
				[
          'currentUser',
				]
			),
    },
    methods: {
      goHome() {
        this.$router.push(
          {
            path: '/',
          }
        );
      },
      logout() {
        firebase.auth().signOut().then(() => {
          this.$store.commit('changeUserName', '');
          this.$store.commit('setBookmarkedGrammarPoint', null);
          this.$store.commit('changeUsersBookmarkID', '');
          this.$router.push({ path: '/' });
        });
      }
    }
  }
</script>

<style scoped>
	.yellow--text {
		font-weight: 800;
  }

  span {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    .yellow--text {
      font-size: 12px;
    }
  }
</style>