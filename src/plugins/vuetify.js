// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark', // Define o tema escuro como padrão
      themes: {
        dark: {
            colors: {
              primary: '#6200EA', // Roxo escuro, exemplo utilizando a cor "Deep Purple A700" como primária
              "on-primary": '#FFFFFF', // Cor do texto em cima do fundo
              secondary: '#03DAC6', // Exemplo de cor secundária
              accent: '#BB86FC', // Roxo claro para contraste como cor de destaque/accent
              background: '#121212', // Cor de fundo recomendada para temas escuros
              "on-background": '#FFFFFF', // Cor do texto em cima do fundo
              surface: '#333333', // Cor da superfície (cards, sheets, etc.)
              // Outras cores como error, info, success, warning podem ser definidas aqui
          }
        }
      }
    }
  });
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
