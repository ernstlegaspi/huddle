import PostCard from "../../../../post_card/PostCard"

export default function FriendsPosts({ posts }: { posts: Post[] }) {
	return <div className="grid grid-cols-2 gap-3 my-6">
		{posts.map(post => <PostCard key={post._id as string} post={post} />)}
	</div>
}
