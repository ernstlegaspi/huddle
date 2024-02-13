import PostCard from "../../../../PostCard"

export default function FriendsPosts({ posts }: { posts: Post[] }) {
	return <div className="grid grid-cols-2 gap-3 my-6">
		{posts.map(post => <PostCard key={post.id as string} post={post} />)}
	</div>
}
