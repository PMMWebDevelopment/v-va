<template>
  <v-container fluid text-xs-center id='home' >
    <v-layout row>
      <v-flex id='home-header' xs12>
        <h1 class='display-3'>WELCOME TO ¡V-VA!</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <div id='home-message'>
          <p>Spanish is the third most widely spoken language in the world after Chinese and English, but is often overlooked by English-speakers when, in fact, it could just be the perfect cure for the lingering childhood nightmares induced by years of having to study the relatively difficult-to-learn French at school, something which managed to put millions of Britons off learning foreign languages for life.</p>
          <p>Spanish is less littered with letters that are technically silent than either French or English - once you've mastered the basic rules, that is - and the language shares enough of its DNA with English to mean that it need not seem so alien to the English-speaking learner.</p>
          <p>Meanwhile, if you are British or American, you are more likely to come into contact with Spanish than you are with any other language apart from English itself, whether in business, on holiday or in everyday life.</p>
          <p>This site contains grammar tips which may help break down the mystery of this rich and fascinating language.</p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-btn color="red">Click here to begin the journey</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    background-image: url('../assets/images/madridbuilding.jpg');
    background-size: cover;
    background-position: fixed;
    min-height: 85.75vh;
    color: yellow;
  }

  h1 {
    text-shadow: 2px 2px 2px black;
    font-weight: 800;
  }

  #home-header {
    margin-bottom: 25px;
  }

  #home-message {
    background-color: rgba(244, 67, 54, 0.85);
    text-align: left;
    padding: 10px;
    margin-bottom: 25px;
  }

  p {
    font-size: 18px;
  }

</style>
