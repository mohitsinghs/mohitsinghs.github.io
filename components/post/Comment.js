import { useComment } from '@/hooks/useComment'
import React from 'react'

const commentNodeId = 'comments'

const Comments = () => {
  useComment(commentNodeId)
  return <div id={commentNodeId} />
}

export default Comments
