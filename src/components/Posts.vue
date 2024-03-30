<script setup lang="ts">
import PostCard from "./PostCard.vue";
import { ref, onMounted } from "vue";
import {
  get as getPosts,
  del as deletePost,
  put as updatePost,
  post as createPosts,
} from "../apis/posts";
import PostModal from "./PostModal.vue";
const posts = ref<any>([]);
const dialogState = ref<boolean>(false);
const selectedPost = ref<any>([]);
const isShowMode = ref<boolean>(false);

// get all posts
const getAllPosts = async (): Promise<void> => {
  try {
    const { data }: any = await getPosts();
    posts.value = data;
  } catch (error) {
    // toast error
  }
};
const controlModal = (state = true) => {
  dialogState.value = state;
};
// delete
const handleDelete = async (id: number) => {
  try {
    // Important: resource will not be really updated on the server but it will be faked as if.
    await deletePost(id);
    // Fake update after deletion
    posts.value = posts.value.filter((post: any) => post.id !== id);
  } catch (error) {
    // toast error
  }
};
// get Post
const handleEdit = async (postId: number) => {
  try {
    const { data } = await getPosts({ id: postId });
    selectedPost.value = data;
    isShowMode.value = false;
    controlModal(true);
  } catch (error) {
    // Handle error scenario [toast error]
  }
};

const handleShow = async (postId: number) => {
  try {
    const { data } = await getPosts({ id: postId });
    selectedPost.value = data;
    isShowMode.value = true;
    controlModal(true);
  } catch (error) {
    // Handle error scenario [toast error]
  }
};

const updateSinglePost = async (postId: number) => {
  try {
    await updatePost(postId, selectedPost.value);
    // Find and update the post in the posts array
    const index = posts.value.findIndex((post: any) => post.id === postId);
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...selectedPost.value };
    }
    isShowMode.value = false;
    controlModal(false);
  } catch (error) {
    // Handle error scenario [toast error]
  }
};

const createPost = async (newPost: any) => {
  const { data } = await createPosts(newPost);
  controlModal(false);
  isShowMode.value = false;
  posts.value = [...posts.value, data];
};
const addPost = async () => {
  selectedPost.value = {};
  isShowMode.value = false;
  controlModal();
};

onMounted(async () => {
  await getAllPosts();
});
</script>

<template>
  <main>
    <VBtn @click="addPost" color="primary" class="mb-4">Add</VBtn>
    <VContainer>
      <VRow>
        <VCol
          v-for="post in posts"
          :key="post.id"
          :lg="3"
          :md="4"
          :sm="6"
          class="d-flex justify-end"
        >
          <PostCard
            :title="post.title"
            :body="post.body"
            :id="post.id"
            @delete="handleDelete"
            @edit="handleEdit"
            @show="handleShow"
          />
        </VCol>
      </VRow>
    </VContainer>
    <PostModal
      v-model="dialogState"
      :post="selectedPost"
      :isShowMode="isShowMode"
      @update="updateSinglePost"
      @create="createPost"
    />
  </main>
</template>
