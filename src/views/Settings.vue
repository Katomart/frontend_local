<template>
  <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Configurações</h1>
        </v-col>
        <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="config in filteredConfigurations"
            :key="config.key"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-row>
                  <v-col>
                    <span>{{ config.key }}: </span>
                    <template v-if="config.value_type === 'bool'">
                      <v-select
                        :items="['true', 'false']"
                        v-model="config.value"
                        :disabled="!config.editable"
                        @update:modelValue="() => handleSelectChange(config)"
                        label="Escolha"
                      ></v-select>
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
                <v-row v-if="config.editable">
                  <v-col>
                    <v-btn @click="() => updateConfiguration(config)">Atualizar</v-btn>
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
        </v-list>
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
    }
  },
  methods: {
    ...mapActions(['fetchConfigurations', 'updateConfiguration']),
    handleSelectChange(config) {
      this.$nextTick(() => {
        this.updateConfiguration(config);
      });
    },
  },
  mounted() {
    this.fetchConfigurations();
  }
}
</script>
