<template>
  <div>
    <v-container class="remaining-players">
      <div class="home">
        <template v-if="d11Match.homeD11Team.id in d11Match.remainingPlayerCount">
          <v-icon medium class="context-icon">mdi-account-multiple</v-icon>
          {{ d11Match.remainingPlayerCount[d11Match.homeD11Team.id] }}
        </template>
      </div>
      <div class="away">
        <template v-if="d11Match.awayD11Team.id in d11Match.remainingPlayerCount">
          {{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }}
          <v-icon medium class="context-icon">mdi-account-multiple</v-icon>
        </template>
      </div>
    </v-container>

    <header-content-background>
      <header-content class="d11-match-result">
        <div class="d11-team home" v-if="mdAndUp || d11Match.homeD11Team.name.length < 20">
          <d11-team-image :version="'small'" :id="d11Match.homeD11Team.id"/>
          {{ d11Match.homeD11Team.name }}
        </div>
        <div class="d11-team home" v-else>
          <d11-team-image :version="'small'" :id="d11Match.homeD11Team.id"/>
          {{ d11Match.homeD11Team.shortName }}
        </div>
        <div class="emphasised" v-if="!pending(d11Match.status)">
          <div class="score">
          {{ d11Match.homeTeamGoals }} - {{ d11Match.awayTeamGoals }}
          </div>
        </div>
        <div v-else>
          <div class="score">vs</div>
        </div>
        <div class="d11-team away" v-if="mdAndUp || d11Match.awayD11Team.name.length < 20">
          {{ d11Match.awayD11Team.name }}
          <d11-team-image :version="'small'" :id="d11Match.awayD11Team.id"/>
        </div>
        <div class="d11-team away" v-else>
          {{ d11Match.awayD11Team.shortName }}
          <d11-team-image :version="'small'" :id="d11Match.awayD11Team.id"/>
        </div>
      </header-content>

      <v-container class="time" v-bind:class="{ active: this.active(d11Match.status) }" v-if="!this.pending(d11Match.status)">
        <span class="elapsed">{{ this.elapsedText(d11Match.elapsed )}}</span>
      </v-container>

    </header-content-background>
  </div>
</template>

<script>
export default {
  name: 'D11MatchMatchResultHorizontal',
  components: {
    HeaderContent: () => import('@/components/header/HeaderContent'),
    HeaderContentBackground: () => import('@/components/header/HeaderContentBackground')
  },
  props: {
    d11Match: Object
  }
}
</script>

<style lang="scss" scoped>
  .d11-match-result {
    .d11-team {
      width: 50%;
    }

    .d11-team.home {
      text-align: left;
    }

    .score {
      width: 100px;
      text-align: center
    }

    .d11-team.away {
      text-align: right;
    }
  }

  .remaining-players,
  .time {
    display: flex;
    padding: 0;

    .v-icon {
      color: white;
    }
    .home {
      margin-left: auto;
      margin-right: 0.9em;
    }

    .away {
      margin-left: 0.9em;
      margin-right: auto;
    }

    span {
      margin: 0 auto;
    }
  }

</style>
