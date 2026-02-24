
const BlogDetails = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params
    console.log(slug)
    return (
        <div>BlogDetails</div>
    )
}

export default BlogDetails