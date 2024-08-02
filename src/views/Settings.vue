<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Configurações</h1>
      </v-col>
      <v-col cols="12" v-for="(configs, groupName) in groupedConfigurations" :key="groupName">
        <v-card class="mb-4">
          <v-card-title>{{ groupName }}</v-card-title>
          <v-list>
            <v-list-item v-for="config in configs" :key="config.key">
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col>
                      <span>{{ config.key }}: </span>
                      <template v-if="config.value_type === 'bool'">
                        <v-btn
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
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
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
        const group = config.configuration_group_name || ' ';
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
