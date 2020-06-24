<template>
  <v-lazy class="d11-match-lazy" v-model="visible" :options="{ threshold: .5 }" transition="fade-transition">
    <v-list-item-title v-if="d11Match" class="d11-match">
      <div class="d11-teams">
        <div class="d11-team home">
          <div class="image">
            <d11-team-image style="align-self: center" :version="'icon'" :id="d11Match.homeD11Team.id"/>
          </div>
          <div class="name main-item">
            {{ d11Match.homeD11Team.name }}
          </div>
          <template v-if="!pending(d11Match.status)">
            <template v-if="d11Match.homeD11Team.id in d11Match.remainingPlayerCount">
              <div class="remaining-players">
                {{ d11Match.remainingPlayerCount[d11Match.homeD11Team.id] }}
              </div>
              <v-icon medium class="remaining-players-icon">mdi-account-multiple</v-icon>
            </template>
            <div class="points">
              {{ d11Match.homeTeamPoints }} pts
            </div>
            <div class="goals emphasised">
              {{ d11Match.homeTeamGoals }}
            </div>
          </template>
          <template v-else>
            <div class="preview">
              Preview
            </div>
          </template>
        </div>
        <div class="d11-team away">
          <div class="image">
            <d11-team-image :version="'icon'" :id="d11Match.awayD11Team.id"/>
          </div>
          <div class="name main-item">
            {{ d11Match.awayD11Team.name }}
          </div>
          <template v-if="!pending(d11Match.status)">
            <template v-if="d11Match.awayD11Team.id in d11Match.remainingPlayerCount">
              <div class="remaining-players">
                {{ d11Match.remainingPlayerCount[d11Match.awayD11Team.id] }}
              </div>
              <v-icon medium class="remaining-players-icon">mdi-account-multiple</v-icon>
            </template>
            <div class="points">
              {{ d11Match.awayTeamPoints }} pts
            </div>
            <div class="goals emphasised">
              {{ d11Match.awayTeamGoals }}
            </div>
          </template>
          <template v-else>
            <div class="preview">
              Preview
            </div>
          </template>
        </div>
      </div>
      <div>
        <v-icon medium class="chevron-icon chevron-right-icon">mdi-chevron-right</v-icon>
      </div>
    </v-list-item-title>
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
  .d11-match-lazy {
    min-height: 60px;
  }

  .d11-teams {
    padding: $d11-spacer 0;
    width: 100%;

    .d11-team {
      display: flex;

      .image {
        display: flex;
        align-items: center;
        padding-right: $d11-spacer;
      }

      .points {
        min-width: 3em;
        text-align: right;
      }

      .goals {
        min-width: 1.5em;
        text-align: right;
      }
    }
  }
</style>
