<template>
  <div>
    <v-container class="time">
      <span class="kick-off">Kick Off {{ match.datetime | moment("HH:mm") }}</span>
    </v-container>

    <header-content-background>
      <header-content>
        <div class="match-result">
          <div class="team home" v-if="mdAndUp || match.homeTeamName.length < 20">
            <team-image :version="'small'" :id="match.homeTeamId"/>
            {{ match.homeTeamName }}
          </div>
          <div class="team home" v-else>
            <team-image :version="'small'" :id="match.homeTeamId"/>
            {{ match.homeTeamShortName }}
          </div>
          <div class="emphasised" v-if="!pending(match.status)">
            <div class="score">
            {{ match.homeTeamGoals }} - {{ match.awayTeamGoals }}
            </div>
          </div>
          <div v-else>
            <div class="score">vs</div>
          </div>
          <div class="team away" v-if="mdAndUp || match.awayTeamName.length < 20">
            {{ match.awayTeamName }}
            <team-image :version="'small'" :id="match.awayTeamId"/>
          </div>
          <div class="team away" v-else>
            {{ match.awayTeamShortName }}
            <team-image :version="'small'" :id="match.awayTeamId"/>
          </div>
        </div>
      </header-content>

      <v-container class="time" v-bind:class="{ active: this.active(match.status) }" v-if="!this.pending(match.status)">
        <span class="elapsed">{{ this.elapsedText(match.elapsed )}}</span>
      </v-container>

      <v-container class="match-goals-container" v-if="match.homeTeamGoals > 0 || match.awayTeamGoals > 0">
        <div class="match-goals">
          <div class="goals home">
            <goal v-for="goal in match.matchEvents[match.homeTeamId].goals" :key="goal.id" :goal="goal" :home="true"/>
          </div>
          <div class="goals away">
            <goal v-for="goal in match.matchEvents[match.awayTeamId].goals" :key="goal.id" :goal="goal" :home="false"/>
          </div>
        </div>
      </v-container>
    </header-content-background>
  </div>
</template>

<script>
export default {
  name: 'MatchMatchResultHorizontal',
  components: {
    HeaderContent: () => import('@/components/header/HeaderContent'),
    HeaderContentBackground: () => import('@/components/header/HeaderContentBackground'),
    Goal: () => import('@/components/match-events/Goal')
  },
  props: {
    match: Object
  }
}
</script>

<style lang="scss" scoped>
  .match-result {
    max-height: 2.3em;
    line-height: 2.3em;
  }

  .match-goals-container {
    padding-top: 0px;
  }

  .match-result,
  .match-goals {
    display: flex;
    padding-right: 0.25em;
    padding-left: 0.25em;

    .team,
    .goals  {
      width: 50%;
    }

    .goal-list {
      list-style: none;
    }
    .team.home,
    .goals.away {
      text-align: left;
    }

    .score {
      width: 100px;
      text-align: center
    }

    .team.away,
    .goals.home {
      text-align: right;
    }

    .goals.home {
        padding-right: 3.5em;
    }
    .goals.away {
        padding-left: 3.5em;
    }
  }

  .time {
    padding-top: 0px;
    padding-bottom: 0px;

    span {
      display: table;
      margin: 0 auto;
    }

    .kick-off {
      margin-top: $d11-background-picture-padding;
    }
  }

</style>
