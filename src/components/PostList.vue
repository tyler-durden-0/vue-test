<template>
    <div v-if="posts.length > 0">
        <h3>Posts list</h3>
        <post-item  
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
    </div>
    <div v-else style="color: red">
        We do not have any posts
    </div>
</template>
<script>
import PostItem from './PostItem.vue';
export default {
    components: {PostItem},
    props: {
        posts: {
            type: Array,
            required: true,
        }
    }
}
</script>
<style scoped>

</style>