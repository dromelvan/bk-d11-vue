<template>
  <span>
    <img v-if="playerOut" alt="Substitution" src="@/assets/images/match-events/substitution-out.png"/>
    <img v-else alt="Substitution" src="@/assets/images/match-events/substitution-in.png"/>
  </span>
</template>

<script>
export default {
  name: 'SubstitutionImage',
  props: {
    substitution: Object,
    playerOut: Boolean
  }
}
</script>
