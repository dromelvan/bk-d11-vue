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

        <template v-if="Object.keys(d11Match.remainingPlayerCount).length === 0">
          Full Time
        </template>
      </div>
    </v-container>

    <header-content-background>
      <header-content vertical class="d11-match-result">
        <div class="d11-team home">
          <span class="d11-team-image-container"><d11-team-image :version="'tiny'" :id="d11Match.homeD11Team.id"/></span>
          <span class="d11-team-name" v-if="d11Match.homeD11Team.name.length < 416">{{ d11Match.homeD11Team.name }}</span>
          <span class="d11-team-name" v-else>{{ d11Match.homeD11Team.shortName }}</span>
          <span class="d11-team-score emphasised">{{ d11Match.homeTeamGoals }}</span>
        </div>
        <div class="d11-team away">
          <span class="d11-team-image-container"><d11-team-image :version="'tiny'" :id="d11Match.awayD11Team.id"/></span>
          <span class="d11-team-name" v-if="d11Match.awayD11Team.name.length < 416">{{ d11Match.awayD11Team.name }}</span>
          <span class="d11-team-name" v-else>{{ d11Match.awayD11Team.shortName }}</span>
          <span class="d11-team-score emphasised">{{ d11Match.awayTeamGoals }}</span>
        </div>
      </header-content>
    </header-content-background>
  </div>
</template>

<script>
export default {
  name: 'D11MatchMatchResultVertical',
  props: {
    d11Match: Object
  }
}
</script>

<style lang="scss" scoped>
  .remaining-players {
    display: flex;
    padding-bottom: 0;

    .away {
      margin-left: auto;
    }

    .v-icon {
      color: white;
    }
  }

  .d11-match-result {
    .header-content {
      .d11-team {
        display: flex;

        .d11-team-name {
          width: 100%;
        }

        .d11-team-score {
          min-width: 36px;
          text-align: center;
        }

        .d11-team-image {
          padding-right: $d11-spacer;
        }
      }
    }
  }

</style>
