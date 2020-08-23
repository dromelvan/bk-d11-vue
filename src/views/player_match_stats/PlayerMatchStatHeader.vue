<template>
  <div class="list-container-header">

    <!-- XS device header --------------------------------------------------->

    <template v-if="xs">
      <div class="position main-item">{{ position }}s</div>
      <div class="points">P.</div>
    </template>

    <!-- Sm and up device header -------------------------------------------->

    <template v-if="smAndUp">
      <div v-if="position" class="position">{{ position }}s</div>
      <template v-if="view !== 'match'">
        <div class="team after-main-item">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Team</span>
            </template>
            <span>The team the player played for this match day</span>
          </v-tooltip>
        </div>
        <div class="match">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">Match</span>
            </template>
            <span>The match the player played for this match day</span>
          </v-tooltip>
        </div>
      </template>
      <div class="goals" :class="{ 'after-main-item':  view === 'match' }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Goals</span>
          </template>
          <span>Goals scored</span>
        </v-tooltip>
      </div>
      <div class="own-goals">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">OGs</span>
          </template>
          <span>Own goals scored</span>
        </v-tooltip>
      </div>
      <div class="goal-assists">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Ass.</span>
          </template>
          <span>Goal assists</span>
        </v-tooltip>
      </div>
      <div class="goals-conceded" v-if="view !== 'd11Match' || mdAndUp">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Con.</span>
          </template>
          <span>Goals conceded (defenders only)</span>
        </v-tooltip>
      </div>
      <div class="cards">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Cards</span>
          </template>
          <span>Yellow and red cards</span>
        </v-tooltip>
      </div>
      <div class="substitutions">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Subs</span>
          </template>
          <span>Substitutions on and/or off</span>
        </v-tooltip>
      </div>
      <div class="rating">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">Rating</span>
          </template>
          <span>WhoScored player rating</span>
        </v-tooltip>
      </div>
      <div class="points">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" v-if="lgAndUp">Points</span>
            <span v-bind="attrs" v-on="on" v-else>Pts</span>
          </template>
          <span>D11 points scored</span>
        </v-tooltip>
      </div>
      <div class="d11-team" v-if="view === 'match'">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" v-if="mdAndUp">D11 Team</span>
            <span v-bind="attrs" v-on="on" v-else>D11</span>
          </template>
          <span>Player D11 team for this match</span>
        </v-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PlayerMatchStatHeader',
  props: {
    position: String,
    view: String
  }
}
</script>

<style lang="scss" scoped>
  .list-container-header {
    .team {
      width: 3em;
    }
    .match {
      width: 4.5em;
    }

    .goals,
    .own-goals,
    .goal-assists,
    .goals-conceded {
      width: 3em;
    }

    .cards,
    .substitutions {
      width: 3.5em;
    }

    div.unused-substitute,
    div.match-not-played,
    div.did-not-participate {
      width: 22.4em;
      opacity: 0.6;
    }

    div.unused-substitute.narrow,
    div.match-not-played.narrow,
    div.did-not-participate.narrow {
      width: 19.4em;
    }

    .rating,
    .points {
      text-align: right;
      width: 3.4em;
    }

    .d11-team {
      text-align: left;
      width: 15em;
    }
  }

  .v-application-md {
    .list-container-header {
      .points {
        width: 2.4em;
      }
      .d11-team {
        width: 9.8em;
      }
    }
  }

  .v-application-sm {
    .list-container-header {
      .points {
        width: 2.4em;
      }
      .d11-team {
        width: 3.5em;
      }
    }
  }
</style>
