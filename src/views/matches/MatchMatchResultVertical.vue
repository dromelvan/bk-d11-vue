<template>
  <div>
    <v-container class="time">
      <div class="kick-off">Kick Off {{ match.datetime | moment("HH:mm") }}</div>
      <div class="elapsed" v-bind:class="{ active: this.active(match.status) }" v-if="!this.pending(match.status)">{{ this.elapsedText(match.elapsed )}}</div>
    </v-container>

    <header-content-background>
      <header-content vertical class="match-result">
        <div class="team home">
          <span class="team-image-container"><team-image :version="'tiny'" :id="match.homeTeam.id"/></span>
          <span class="team-name" v-if="match.homeTeam.name.length < 16">{{ match.homeTeam.name }}</span>
          <span class="team-name" v-else>{{ match.homeTeam.shortName }}</span>
          <span class="team-score emphasised">{{ match.homeTeamGoals }}</span>
        </div>
        <div class="team away">
          <span class="team-image-container"><team-image :version="'tiny'" :id="match.awayTeam.id"/></span>
          <span class="team-name" v-if="match.awayTeam.name.length < 16">{{ match.awayTeam.name }}</span>
          <span class="team-name" v-else>{{ match.awayTeam.shortName }}</span>
          <span class="team-score emphasised">{{ match.awayTeamGoals }}</span>
        </div>
      </header-content>

      <v-container class="match-goals-container" v-if="match.homeTeamGoals > 0 || match.awayTeamGoals > 0">
        <div class="match-goals">
          <div class="goal" v-bind:class="{ home: goal.team.id === match.homeTeam.id, away: goal.team.id === match.awayTeam.id }" v-for="goal in goals" :key="goal.id">
            <goal :goal="goal" :home="goal.home"/>
          </div>
        </div>
      </v-container>

    </header-content-background>
  </div>
</template>

<script>
export default {
  name: 'MatchMatchResultVertical',
  props: {
    match: Object
  },
  components: {
    HeaderContent: () => import('@/components/header/HeaderContent'),
    HeaderContentBackground: () => import('@/components/header/HeaderContentBackground'),
    Goal: () => import('@/components/match-events/Goal')
  },
  computed: {
    goals: function () {
      var goals = []
      this.match.matchEvents[this.match.homeTeam.id].goals.forEach(goal => {
        goal.home = true
        goals.push(goal)
      })
      this.match.matchEvents[this.match.awayTeam.id].goals.forEach(goal => {
        goal.home = false
        goals.push(goal)
      })
      goals.sort(function (goalA, goalB) {
        var compare = goalA.time - goalB.time
        if (compare === 0) {
          compare = goalA.addedTime - goalB.addedTime
        }
        return compare
      })
      return goals
    }
  }
}
</script>

<style lang="scss" scoped>
  .match-result {
    .header-content {
      .team {
        display: flex;

        .team-name {
          width: 100%;
        }

        .team-score {
          min-width: 36px;
          text-align: center;
        }
      }
    }
  }

  .time {
    padding: 0px inherit;
    display: flex;

    .elapsed {
      margin-left: auto;
    }
  }

  .goal.home {
    text-align: right;
    padding-right: calc(50% - (#{$d11-match-even-icon-width} / 2));
  }

  .goal.away {
    text-align: left;
    padding-left: calc(50% - (#{$d11-match-even-icon-width} / 2));
  }
</style>
