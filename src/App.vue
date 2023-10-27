<template>
    <!-- Здесь мы пишем каркас нашего коспонента -->
    <!-- С помощью интерполяции(как в Ангуляре) в шаблоне достаем значение поля компоненты -->
    <div class="app">
        <h1>Posts page</h1>
        <my-button
            @click="showDialog"
            style="margin: 15px 0"
        >
            Create new post
        </my-button>
        <post-list
            :posts="posts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>
            Loading...
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>
    </div>
</template>

<script>
import PostForm from './components/postForm.vue';
import PostList from './components/PostList.vue';
import axios from 'axios';
// здесь мы описываем логику компонента 
// в этой секции по дефолту нужно экспортировать объект

// Функции объявляются в поле methods 
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            modificatorInput: '',
            isPostsLoading: false
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(postElment => post.id !== postElment.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
                this.posts = response.data;
            } catch(e) {
                alert(e);
            } finally {
                this.isPostsLoading = false;
            }
        }
    },
    mounted() {
        this.fetchPosts();
    }
}
</script>

<!-- scoped икапсулирет стили только на свой компонент  -->
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
</style>