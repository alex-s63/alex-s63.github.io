<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<!-- COMPONENT -->
<script>
    import Header from './components/Header'

	export default {

		name: 'App',
        components: {
			AppHeader: Header
        },
		data() {
			return {
			}
		},
	}
</script>

<style lang="scss">
  /** Global styles */
  body{
    font-family: sans-serif;
  }
  .container{
    max-width: 1200px;
    padding: 0 10px;
    margin: 0 auto;
  }
</style>
