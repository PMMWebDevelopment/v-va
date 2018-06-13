<template>
  <v-container fluid text-xs-center id='signuplogin' >
    <v-layout row>
      <v-flex id='signuplogin-header' xs12>
        <h1 class='display-3'>Sign up / Log in</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
		<v-flex xs12>
			<form>
				<v-text-field
					v-model="email"
          type='email'
					label="E-mail"
					required>
				</v-text-field>
				<v-text-field
					v-model="password"
          type='password'
					label="Password"
					required>
				</v-text-field>
				<v-btn @click="signup" color="red">Sign up</v-btn>
				<v-btn @click="login" color="red">Log in</v-btn>
			</form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
	name: 'SignupLogin',
    data: () => ({
      email: '',
      password: ''
    }),
    computed: {
        ...mapGetters(
        [
          'loggedInUser'
        ]
      ),
    },
    methods: {
      signup(event) {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            this.$store.commit('changeUserName', response.user.email);
						alert(`Account created for ${this.email}`);
						this.clear();
            this.$router.push({ path: '/' });
          },
          (err) => {
						alert(err.message);
						this.clear();
					});
        event.preventDefault();
      },
      clear() {
        this.email = '';
        this.password = '';
			},
			login(event) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            this.getBookmarks();
            this.$store.commit('changeUserName', response.user.email);
            alert(`${this.email} logged in`);
            this.clear();
            this.$router.push({ path: '/' });
          },
          (err) => {
            alert(err.message);
            this.clear();
          });
        event.preventDefault();
      },
      getBookmarks() {
        firebase.auth().currentUser.getIdToken().then((idToken) => {
          this.$http.get(`https://v-va-pmm.firebaseio.com/bookmarks.json?auth=${idToken}&orderBy="user"&equalTo="${this.$store.state.loggedInUser}"`).then((response) => {
          if (Object.keys(response.body).length > 0) {
            this.usersBookmarkID = Object.keys(response.body)[0];
            this.usersBookmarkedLessonNumber = response.body[this.usersBookmarkID].bookmark;
            this.$store.commit('setBookmarkedGrammarPoint', this.usersBookmarkedLessonNumber);
            this.$store.commit('changeUsersBookmarkID', this.usersBookmarkID);
          }
        },
          (err) => {
            alert(err.message);
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#signuplogin {
		background-image: url('../assets/images/tango.jpg');
		background-size: cover;
		background-position: fixed;
		min-height: 85.75vh;
		color: yellow;
	}

	h1 {
		text-shadow: 2px 2px 2px black;
		font-weight: 800;
	}

	#signuplogin-header {
		margin-bottom: 25px;
	}

	form {
		padding: 20px;
		background-color: rgba(0, 0, 0, 0.75);
	}

</style>
