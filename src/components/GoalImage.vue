<template>
  <span>
    <img style="vertical-align: middle" v-if="!goal.penalty && !goal.ownGoal" alt="Goal" src="@/assets/images/match-events/goal.png"/>
    <img v-if="goal.penalty" alt="Goal" src="@/assets/images/match-events/penalty-goal.png"/>
    <img v-if="goal.ownGoal" alt="Goal" src="@/assets/images/match-events/own-goal.png"/>
  </span>
</template>

<script>
export default {
  name: 'GoalImage',
  props: {
    goal: Object
  }
}
</script>
