<script setup lang="ts">
import { ref, watch, computed } from "vue";
interface Post {
  title: string;
  body: string;
  id: number;
  userId?: number;
}
type Props = {
  post: [Post];
  text?: string;
  isShowMode?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  text: "Edit",
});
const isShowCall = ref(false);

watch(
  () => props.isShowMode,
  (val) => {
    isShowCall.value = val;
  }
);

watch(
  () => props.post,
  () => {
    newPost.value = {
      title: props.post[0]?.title || "",
      body: props.post[0]?.body || "",
    };
  }
);
const newPost = ref({
  title: "",
  body: "",
});

const editOrAdd = computed(() => (props.post[0] ? "Edit" : "Add"));
const local = ref(false);
const emit = defineEmits(["update", "create"]);
const handleUpdate = (id: number) => {
  emit("update", id);
};

const handelPost = () => {
  if (!props.post[0]) {
    emit("create", newPost.value);
  } else {
    handleUpdate(props.post[0].id);
  }
};
</script>
<template>
  <v-dialog max-width="500" v-model="local">
    <template v-slot:default="{}">
      <v-card title="Dialog">
        <v-text-field
          placeholder="Title"
          v-model="newPost.title"
          color="success"
          :disabled="isShowCall"
        ></v-text-field>
        <v-textarea
          placeholder="Body"
          v-model="newPost.body"
          color="success"
          :disabled="isShowCall"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="editOrAdd" @click="handelPost"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
