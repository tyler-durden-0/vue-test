<template>
    <!-- Здесь мы пишем каркас нашего коспонента -->
    <!-- С помощью интерполяции(как в Ангуляре) в шаблоне достаем значение поля компоненты -->
    <div class="app">
        <h1>Posts page</h1>
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Create new post
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            ></my-select>
        </div>
        <post-list
            :posts="sortedPosts"
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
import PostForm from './components/PostForm.vue';
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
            isPostsLoading: false,
            modificatorInput: '',
            selectedSort: '',
            sortOptions: [
                {value: 'title', name:'Name info'},
                {value: 'body', name:'Body info'}
            ]
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
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        }
    }
    // watch: {
    //     // функция-набльдатель отрабаотывает в тот самый момент когда срабатывает 
    //     // модель с тем же названием(selectedSort)
    //     selectedSort(newValue) {
    //         this.posts.sort((post1, post2) => {
    //             return post1[newValue]?.localeCompare(post2[newValue])
    //         })
    //     },
    // }
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
.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
</style>