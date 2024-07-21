<template>
  <v-app-bar app dense>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col
          v-for="item in menuItems"
          :key="item.text"
          cols="auto"
        >
          <v-btn
            :color="item.link === $route.path ? 'primary' : 'default'"
            text
            @click="goTo(item.link)"
          >
            {{ item.text }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>


<script>
export default {
  data() {
    return {
      menuItems: [
        { text: 'ToS', link: '/tos' },
        { text: 'Home', link: '/home' },
        { text: 'Gerenciar Contas', link: '/manage-accounts' },
        { text: 'Gerenciar Cursos', link: '/manage-courses' },
        { text: 'Gerenciar Downloads', link: '/manage-downloads' },
        { text: 'Visualizar Logs', link: '/view-logs' },
        { text: 'Configurações', link: '/settings' }
      ]
    };
  },
  mounted() {
    this.$store.dispatch('fetchKatomartConsent');
  },
  methods: {
    goTo(link) {
      this.$router.push(link);
    }
  },
  computed: {
    requiresConsent() {
      return this.$store.state.requiresConsent;
    }
  },
  watch: {
    requiresConsent(newValue, oldValue) {
      if (!newValue) {
        this.$router.push('/tos');
      } else {
        this.$router.push('/home');
      }
    }
  }
}
</script>
  