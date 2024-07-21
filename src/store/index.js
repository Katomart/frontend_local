import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    requiresConsent: !!localStorage.getItem('katomartConsent'),
    configurations: []
  },
  mutations: {
    setRequiresConsent(state, consent) {
      state.requiresConsent = consent;
    },
    setConfigurations(state, configurations) {
      state.configurations = configurations;
    },
    updateConfiguration(state, updatedConfig) {
      const index = state.configurations.findIndex(c => c.id === updatedConfig.id);
      if (index !== -1) {
        state.configurations[index] = updatedConfig;
      }
    }
  },
  actions: {
    // Deprecado, refatorar método de configurar autenticação
    fetchKatomartConsent({ commit }) {
      axios.get('http://localhost:6102/api/get_katomart_consent')
        .then(response => {
          commit('setRequiresConsent', response.data.status);
        })
        .catch(error => {
          console.error('Failed to fetch consent:', error);
          commit('setRequiresConsent', false);
        });
    },
    updateKatomartConsent({ commit }, consent) {
      commit('setRequiresConsent', consent);
    },
    async fetchConfigurations({ commit }) {
      try {
        const response = await axios.get(`http://localhost:6102/api/get_all_configurations`);
        if (response.data.status) {
          commit('setConfigurations', response.data.message);
        } else {
          console.error('Erro ao buscar configurações:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      }
    },
    async updateConfiguration({ dispatch }, config) {
      try {
        console.log('Updating configuration:', config);
        const response = await axios.put(`http://localhost:6102/api/configurations/${config.key}`, config);
        if (response.data.status) {
          dispatch('fetchConfigurations');
        } else {
          console.error('Erro ao atualizar configuração:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao atualizar configuração:', error);
      }
    }
  },
  getters: {
    requiresConsent: state => state.requiresConsent,
    getAllConfigurations: state => state.configurations,
    getConfigurationById: (state) => (id) => {
      return state.configurations.find(config => config.id === id);
    },
    getConfigurationByKey: (state) => (key) => {
      return state.configurations.find(config => config.key === key);
    }
  }
});
