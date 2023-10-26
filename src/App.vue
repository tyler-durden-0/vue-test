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
        />
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
// здесь мы описываем логику компонента 
// в этой секции по дефолту нужно экспортировать объект

// Функции объявляются в поле methods 
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'JavaScript', body: 'post description'},
                {id: 2, title: 'JavaScript2', body: 'post description2'},
                {id: 3, title: 'JavaScript3', body: 'post description3'},
                {id: 4, title: 'JavaScript4', body: 'post description4'},
            ],
            dialogVisible: false
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
        }
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