<template>
  <div class="container">
    <iframe :srcdoc="htmlContent" frameborder="0" width="100%" height="500px"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      htmlContent: '',
    };
  },
  mounted() {
    this.loadHTMLContent();
  },
  methods: {
    loadHTMLContent() {
      this.$axios.get('https://www.example.com/api/get_news')
        .then(response => {
          this.htmlContent = response.data;
        })
        .catch(error => {
          console.error('Failed to load HTML content:', error);
        });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
