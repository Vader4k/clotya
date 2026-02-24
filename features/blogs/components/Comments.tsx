import { Comment } from '../types/blog.types'

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className='grid gap-12 my-4 md:my-8'>
      {comments.map((comment) => (
        <div key={comment.id} className='flex items-start gap-4'>
          <div className='flex items-center gap-2 min-w-15'>
            <img src={comment.authorImage} alt={comment.author} className='size-16 rounded-md' />
          </div>
          <div>
            <div className='flex items-center w-full gap-3'>
              <h3 className='md:text-lg text-base font-medium uppercase'>{comment.author}</h3>
              <p className='text-xs text-gray-500'>—</p>
              <p className='text-xs text-gray-500 capitalize'>{comment.date}</p>
            </div>
            <p className=' mt-4 font-inter md:text-sm text-xs'>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments