<template>
    <div>
        <h1>Posts page</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Create new post
            </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>
            Loading...
        </div>
        <div ref="observer" class="observer"></div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
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
    },
    mounted() {
        this.fetchPosts();
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts();
            }
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    }
}
</script>


<style>
.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
    cursor: default;
}
.current-page {
    border: 2px solid teal;
}
.observer {
    height: 30px;
    background: green;
}
</style>
