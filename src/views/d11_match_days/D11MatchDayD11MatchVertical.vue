<template>
  <v-lazy class="d11-match" v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
    <div class="d11-match-rows" v-if="d11Match">
      <div class="table-row vertical">
        <div class="d11-team home">
          <d11-team-image :version="'icon'" :id="d11Match.homeD11Team.id"/>
          <div class="name home main-column">
            {{ d11Match.homeD11Team.name }}
          </div>
          <template v-if="d11Match.homeD11Team.id in d11Match.remainingPlayerCount">
            <div class="remaining-players home">
              {{ d11Match.remainingPlayerCount[d11Match.homeD11Team.id] }}
            </div>
            <v-icon medium class="remaining-players-icon">mdi-account-multiple</v-icon>
          </template>
          <div class="points">
            {{ d11Match.homeTeamPoints }} pts
          </div>
          <div class="goals">
            {{ d11Match.homeTeamGoals }}
          </div>
        </div>
        <div class="d11-team away">
          <d11-team-image :version="'icon'" :id="d11Match.awayD11Team.id"/>
          <div class="name away main-column">{{ d11Match.awayD11Team.name }}</div>
          <template v-if="d11Match.awayD11Team.id in d11Match.remainingPlayerCount">
            <div class="remaining-players away">
              {{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }}
            </div>
            <v-icon medium class="remaining-players-icon">mdi-account-multiple</v-icon>
          </template>
          <div class="points">{{ d11Match.awayTeamPoints }} pts</div>
          <div class="goals">{{ d11Match.awayTeamGoals }}</div>
        </div>
      </div>
      <v-icon medium class="chevron-icon chevron-right-icon">mdi-chevron-right</v-icon>
    </div>
  </v-lazy>
</template>

<script>
import axios from 'axios'

export default {
  name: 'D11MatchDayD11MatchVertical',
  data: () => ({
    d11Match: null,
    visible: false
  }),
  props: {
    d11MatchId: Number
  },
  components: {
    D11TeamImage: () => import('@/components/D11TeamImage')
  },
  watch: {
    visible: function () {
      axios
        .get(this.endpoint('d11Match', { id: this.d11MatchId }))
        .then(response => (this.d11Match = response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .d11-match {
    height: 82px;

    .d11-match-rows {
      display: flex;

      .table-row.vertical {
        width: 100%;
      }

      .d11-team {
        display: flex;
        justify-content: center;
        width: 100%;

        .d11-team-image {
          align-self: center;
        }

        .points,
        .goals {
          text-align: right;
        }

        .points {
          min-width: 3em;
        }

        .goals {
          min-width: 1.8em;
          font-weight: 600;
        }

        .remaining-players-icon {
          padding-left: $d11-spacer;
        }
      }

      .chevron-right-icon {
        padding-left: $d11-spacer;
      }
    }
  }
</style>
