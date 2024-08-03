<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Configurações</h1>
      </v-col>
      <v-expansion-panels cols="12" v-for="(configs, groupName) in groupedConfigurations" :key="groupName">
        <v-expansion-panel class="mb-4">
          <v-expansion-panel-title><h3>{{ groupName != 'undefined' ? groupName : 'Configuração de caminho' }}</h3></v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list-item v-for="config in configs" :key="config.key">
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col>
                      <span>{{ config.key }}: </span>
                      <template v-if="config.value_type === 'bool'">
                        <v-btn
                          :style="{ 
                          'color': config.value ? '#332f2f' : '#d4c7c7',
                          'background-color': config.value ? '#38ff49' : '#ed1818',
                          'border-style': 'solid',
                          'border-width': '1px',
                          'border-color': 'black',
                          }"
                          :disabled="!config.editable" @click="handleToggleButton(config)"
                        >
                          {{ config.value }}
                        </v-btn>
                      </template>
                      <template v-else-if="config.value_type === 'str'">
                        <v-text-field
                          v-model="config.value"
                          :disabled="!config.editable"
                          @blur="updateConfiguration(config)"
                          label="Valor"
                        ></v-text-field>
                      </template>
                      <template v-else-if="config.value_type === 'number' || config.value_type === 'int' || config.value_type === 'float'">
                        <v-text-field
                          v-model="config.value"
                          :disabled="!config.editable"
                          type="number"
                          @blur="updateConfiguration(config)"
                          label="Valor"
                        ></v-text-field>
                      </template>
                      <template v-else>
                        <v-text-field
                          v-model="config.value"
                          :disabled="!config.editable"
                          @blur="updateConfiguration(config)"
                          label="Valor"
                        ></v-text-field>
                      </template>
                    </v-col>
                  </v-row>
                </v-list-item-title>
                <v-list-item-subtitle v-if="config.description">
                  {{ config.description }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="config.voidable">
                  (Pode ser anulado)
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="!config.enabled">
                  (Desativado)
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script setup>
  import { ref } from 'vue'

  const panel = ref(0)
</script>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Settings',
  computed: {
    ...mapGetters(['getAllConfigurations']),
    filteredConfigurations() {
      return this.getAllConfigurations.filter(config => !config.hidden);
    },
    groupedConfigurations() {
      return this.filteredConfigurations.reduce((groups, config) => {
         const settings_names = {
          setup: 'configurações de inicialização',
          filesystem: 'configurações de salvamento de arquivos',
          ffmpeg: 'configurações do ffmpeg',
          download: 'configurações de download',
          remote: 'configurações de acesso remoto'
        };

        let group;
        for (const [key, value] of Object.entries(settings_names)) {
          if (config.configuration_group_name === key) {
            group = value || ''
          }
        }
        
        if (!groups[group]) {
          groups[group] = [];
        }
        
        groups[group].push(config);
        return groups;
      }, {});
    }
  },
  methods: {
    ...mapActions(['fetchConfigurations', 'updateConfiguration']),
    handleToggleButton(config) {
      config.value = config.value === true ? false : true;
      this.updateConfiguration(config);
    }
  },
  mounted() {
    this.fetchConfigurations();
  }
}
</script>
<style>
.toggleButton {
  background-color: v-bind(red);
}
</style>