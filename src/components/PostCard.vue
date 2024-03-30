<script setup lang="ts">
defineProps<{
  title?: string;
  body?: string;
  id: number;
}>();

const emit = defineEmits(["delete", "edit", "show"]);
const handleDelete = (id: number) => {
  emit("delete", id);
};

const handleEdit = (id: number) => {
  emit("edit", id);
};

const handleShow = (id: number) => {
  emit("show", id);
};
</script>
<template>
  <VCard
    @click.stop="handleShow(id)"
    max-width="400"
    class="mx-auto"
    variant="outlined"
    elevation="0"
  >
    <v-card-title class="text-h6">{{ title }}</v-card-title>
    <v-card-text class="text--primary text-truncate">
      {{ body }}
    </v-card-text>
    <v-card-actions>
      <VBtn color="#B71C1C" variant="elevated" @click.stop="handleDelete(id)"
        >Delete
      </VBtn>
      <VBtn color="primary" variant="text" @click.stop="handleEdit(id)">
        Edit
      </VBtn>
    </v-card-actions>
  </VCard>
</template>
