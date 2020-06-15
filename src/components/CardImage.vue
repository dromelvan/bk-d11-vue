<template>
  <span>
    <img v-if="card.cardType === 'YELLOW'" alt="Card" src="@/assets/images/match-events/yellow-card.png"/>
    <img v-if="card.cardType === 'RED'" alt="Card" src="@/assets/images/match-events/red-card.png"/>
  </span>
</template>

<script>
export default {
  name: 'CardImage',
  props: {
    card: Object
  }
}
</script>
