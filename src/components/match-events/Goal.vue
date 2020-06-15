<template>
  <div class="goal-container">
    <div class="goal home" v-if="home">
      <span class="goal-text" v-if="smAndUp">{{ goal.playerName }} {{ goal.time }}'</span>
      <span class="goal-text" v-if="xs">{{ goal.playerLastName }} {{ goal.time }}'</span>
      <span class="goal-text" v-if="goal.penalty && smAndUp"> (pen)</span>
      <span class="goal-text" v-if="goal.penalty && xs"> (p)</span>
      <span class="goal-text" v-if="goal.ownGoal"> (og)</span>
      <own-goal-icon v-if="goal.ownGoal"/>
      <goal-icon v-else/>
    </div>
    <div class="goal away" v-else>
      <own-goal-icon v-if="goal.ownGoal"/>
      <goal-icon v-else/>
      <span class="goal-text" v-if="goal.penalty && smAndUp">(pen) </span>
      <span class="goal-text" v-if="goal.penalty && xs">(p) </span>
      <span class="goal-text" v-if="goal.ownGoal">(og) </span>
      <span class="goal-text" v-if="smAndUp">{{ goal.time }}' {{ goal.playerName }}</span>
      <span class="goal-text" v-if="xs">{{ goal.time }}' {{ goal.playerLastName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goal',
  props: {
    goal: Object,
    home: Boolean
  },
  components: {
    GoalIcon: () => import('@/components/match-events/GoalIcon'),
    OwnGoalIcon: () => import('@/components/match-events/OwnGoalIcon')
  }
}
</script>

<style lang="scss" scoped>
  .goal-container {
    line-height: 1.5em;
    vertical-align: middle;
  }

  .goal-text {
    vertical-align: middle;
  }

  .home {
    .goal-icon {
      margin-left: 0.2em;
    }
  }

  .away {
    .goal-icon {
      margin-right: 0.2em;
    }
  }

</style>
